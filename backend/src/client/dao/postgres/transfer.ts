import { PostgresDB } from ".";
import { Transfer } from "../../../models";
import dotenv from "dotenv";

dotenv.config();
const { Client } = require("pg");
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { compareAccounts } from "../../../utils";
import { DataRowMessage } from "pg-protocol/dist/messages";

class TransferTable extends PostgresDB {
  public async insert(transfer: Transfer): Promise<Object> {
    const client = new Client();

    try {
      const equal = compareAccounts(
        transfer.ownerCpf,
        transfer.transferCpf,
        transfer.ownerAccount,
        transfer.transferAccount,
        transfer.ownerAccountDigit,
        transfer.transferAccountDigit,
        transfer.ownerAgency,
        transfer.transferAgency,
        transfer.ownerAgencyDigit,
        transfer.transferAgencyDigit
      );
      if (equal) {
        return false;
      }
      await client.connect();
      console.log("conectado ao banco transfer");
      const selectOwnerBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
            owners_cpf=$1 and 
            agency=$2 and 
            agency_digit=$3 and
            account=$4 and
            account_digit=$5
            `;

      const check = await client.query(selectOwnerBalanceQuery, [
        transfer.ownerCpf,
        transfer.ownerAgency,
        transfer.ownerAgencyDigit,
        transfer.ownerAccount,
        transfer.ownerAccountDigit,
      ]);
      const compare = bcrypt.compareSync(
        transfer.ownerPassword,
        check.rows[0].password
      );

      if (!compare) {
        return false;
      }
      console.log("conectado ao banco transfer2");
      const ownerBalance = check.rows[0];
      const ownerId = ownerBalance.id;

      const selectBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
                agency=$1 and 
                agency_digit=$2 and
                account=$3 and
                account_digit=$4
            `;

      const check2 = await client.query(selectBalanceQuery, [
        transfer.transferAgency,
        transfer.transferAgencyDigit,
        transfer.transferAccount,
        transfer.transferAccountDigit,
      ]);
      const transferId = check2.rows[0].id;

      if (!transferId || !ownerId) {
        return false;
      }

      const ownerAtualBalance = parseFloat(ownerBalance.balance);
      const transferValue = parseFloat(transfer.value);

      const fee = 1;
      const newFee = transferValue + fee;
      const newValue = ownerAtualBalance - newFee;

      if (newValue >= 0) {
        console.log("permitido");

        const insertTransferQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at, type ) 
                VALUES 
                    ( $1, $2, $3, $4, NOW(), $5 ) RETURNING id
                `;

        const result = await client.query(insertTransferQuery, [
          transfer.id,
          ownerId,
          "transferência efetuada",
          transfer.value,
          "debito",
        ]);

        console.log("feito");
        if (result.rows.length !== 0) {
          console.log("primeiro ok");
        }

        const insertTransferExtract = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at, type) 
                VALUES 
                    ( $1, $2, $3, $4, NOW(), $5 ) RETURNING id
                `;
        const transferTableId = v4();

        const depositResult = await client.query(insertTransferExtract, [
          transferTableId,
          transferId,
          "transferência recebida",
          transfer.value,
          "credito",
        ]);

        console.log(result.rows);
        if (depositResult.rows.length !== 0) {
          console.log("segundo ok");
        }

        const insertFeeQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at, type) 
                VALUES 
                    ( $1, $2, $3, $4, NOW(), $5 ) RETURNING id
                `;

        const passFee = String(fee);
        const feeId = v4();

        const feeResult = await client.query(insertFeeQuery, [
          feeId,
          ownerId,
          "taxa",
          passFee,
          "debito",
        ]);
        if (feeResult.rows.length !== 0) {
          console.log("terceiro ok");
        }

        const alterBalanceOwner = `
                UPDATE public.accounts SET balance = balance - $1
                WHERE
                    owners_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
        const alterBalanceOwnerValues = [
          newFee,
          transfer.ownerCpf,
          transfer.ownerAgency,
          transfer.ownerAgencyDigit,
          transfer.ownerAccount,
          transfer.ownerAccountDigit,
        ];
        console.log(alterBalanceOwnerValues);
        console.log("antes do balance do owner");
        const ownerBalance = await client.query(
          alterBalanceOwner,
          alterBalanceOwnerValues
        );
        const alterBalanceTransfer = `
                UPDATE public.accounts SET balance = balance + $1
                WHERE
                    owners_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
        const alterBalanceTransferValues = [
          newFee,
          transfer.transferCpf,
          transfer.transferAgency,
          transfer.transferAgencyDigit,
          transfer.transferAccount,
          transfer.transferAccountDigit,
        ];
        console.log(alterBalanceTransferValues);
        console.log("antes do balance do transfer");
        const transferBalance = await client.query(
          alterBalanceTransfer,
          alterBalanceTransferValues
        );
        console.log(transferBalance.rows[0].balance);

        const data = {
          transfer_out: {
            id: transferId.id,
            value: transfer.value,
            cpf: transfer.ownerCpf,
            agency: transfer.ownerAgency,
            agencyDigit: transfer.ownerAgencyDigit,
            account: transfer.ownerAccount,
            accountDigit: transfer.ownerAccountDigit,
            createdAt: new Date(),
          },
          transfer_in: {
            id: transferTableId,
            cpf: transfer.ownerCpf,
            agency: transfer.transferAgency,
            agencyDigit: transfer.transferAgencyDigit,
            account: transfer.transferAccount,
            accountDigit: transfer.transferAccountDigit,
            createdAt: new Date(),
          },
          fee: {
            id: feeId,
            value: passFee,
          },
        };

        await client.end();

        return data;
      }

      return false;
    } catch (error) {
      await client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { TransferTable };
