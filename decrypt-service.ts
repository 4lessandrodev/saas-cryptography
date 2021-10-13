import crypto, { scryptSync } from 'crypto';
import { ALGORITHM, DECRYPT_ENCODING_INPUT, DECRYPT_ENCODING_OUTPUT, KEY_LENGTH } from './env';
import Params from './params';
import { validateParams } from './validate-params';
import transformData from './transform-data.util';

export const DecryptService = async <T>(params: Params ): Promise<T> => {
	
	const { data, password, salt } = params;

	validateParams(params);

	const iv = Buffer.alloc(16, 0);
	const key = scryptSync(password, salt, KEY_LENGTH);
	
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
	
	let decrypted = cipher.update(data, DECRYPT_ENCODING_INPUT, DECRYPT_ENCODING_OUTPUT);

	decrypted += cipher.final(DECRYPT_ENCODING_OUTPUT);

	const result = transformData<T>(decrypted);
	
	return result;
}

export default DecryptService;
