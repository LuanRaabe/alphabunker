import { verify } from "jsonwebtoken";
import { auth } from "../config";

export function verifyToken(antigoToken: any){
    if(!antigoToken){
        return false;
    }
    
    const token = verify(antigoToken, auth.secret, function(err: unknown){
        if(err){
            return false;
        }
        return true;
    });
    return token;
}