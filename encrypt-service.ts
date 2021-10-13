import crypto, { scryptSync } from 'crypto';
import { ALGORITHM, ENCRYPT_ENCODING_INPUT, ENCRYPT_ENCODING_OUTPUT, KEY_LENGTH } from './env';
import getDataAsString from './get-data-as-string.util';
import Params from './params';
import { validateParams } from './validate-params';

export interface IEncrypt {
    data: string;
}

export const EncryptService = async (params: Params): Promise<IEncrypt> => {
    
    validateParams(params);
    
    const { password, salt, data } = params;   
    
    let dataToEncrypt: string = getDataAsString(data);

    const iv = Buffer.alloc(16, 0);
    const key = scryptSync(password, salt, KEY_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(dataToEncrypt, ENCRYPT_ENCODING_INPUT, ENCRYPT_ENCODING_OUTPUT );

    encrypted += cipher.final(ENCRYPT_ENCODING_OUTPUT);
    
    return { 
        data: encrypted
    };
}

export default EncryptService;
