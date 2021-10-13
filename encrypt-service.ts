import crypto, { scryptSync } from 'crypto';
import { ALGORITHM, ENCRYPT_ENCODING_INPUT, ENCRYPT_ENCODING_OUTPUT, KEY_LENGTH, SALT } from './env';

export interface IEncrypt {
    data: string;
}

export const EncryptService = async (data: string, password?: string): Promise<IEncrypt> => {
    
    if(!password || password?.length !== KEY_LENGTH){
        throw new Error('Api key not provided on headers or Invalid value');
    }
    
    const iv = Buffer.alloc(16, 0);
    const key = scryptSync(password, SALT, KEY_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(data, ENCRYPT_ENCODING_INPUT, ENCRYPT_ENCODING_OUTPUT );

    encrypted += cipher.final(ENCRYPT_ENCODING_OUTPUT);
    
    return { 
        data: encrypted
    };
}

export default EncryptService;
