import crypto, { scryptSync } from 'crypto';
import { IEncrypt } from './encrypt-service';
import { ALGORITHM, DECRYPT_ENCODING_INPUT, DECRYPT_ENCODING_OUTPUT, KEY_LENGTH, SALT } from './env';

interface IDEcrypt {
    data: string;
}

export const DecryptService = async ({ data }: IEncrypt, password?: string): Promise<IDEcrypt> => {
    
    if(!password || password?.length !== KEY_LENGTH){
        throw new Error('Api key not provided on headers or Invalid value');
    }

    const iv = Buffer.alloc(16, 0);
    const key = scryptSync(password, SALT, KEY_LENGTH);
    
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let decrypted = cipher.update(data, DECRYPT_ENCODING_INPUT, DECRYPT_ENCODING_OUTPUT);

    decrypted += cipher.final(DECRYPT_ENCODING_OUTPUT);
    
    return { data: decrypted };
}

export default DecryptService;
