import {
  NameValidator,
  EmailValidator,
  BirthdateValidator,
  CPFValidator,
  PasswordValidator,
} from ".";
import { Owner } from "../models";

class OwnerDataValidator {
  public owner: Partial<Owner>;
  public errors: string;

  private nameValidator = NameValidator;
  private emailValidator = EmailValidator;
  private passwordValidator = PasswordValidator;
  private birthdateValidator = BirthdateValidator;
  private cpfValidator = CPFValidator;

  public constructor(owner: Owner) {
    this.errors = "";
    this.owner = this.validation(owner);
  }

  private validation(owner: Owner): Partial<Owner> {
    const validName = new this.nameValidator(owner.name);
    const validEmail = new this.emailValidator(owner.email);
    const validPassword = new this.passwordValidator(owner.password);
    const validBirthdate = new this.birthdateValidator(owner.birthdate);
    const validCpf = new this.cpfValidator(owner.cpf);

    this.errors = this.errors.concat(
      `${validName.errors}${validEmail.errors}${validBirthdate.errors}${validCpf.errors}`
    );

    const ownerData: Partial<Owner> = {
      name: validName.name,
      email: validEmail.email,
      password: validPassword.password,
      birthdate: validBirthdate.birthdate,
      cpf: validCpf.cpf,
    };

    return ownerData;
  }
}

export { OwnerDataValidator };
