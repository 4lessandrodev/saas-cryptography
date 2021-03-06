import Params from '@app/services/params';
import { PASS_LENGTH, SALT_LENGTH } from '@app/config/env';

export const validateParams = <T>({ password, salt }: Params<T>): void => {

	const keyLength = password?.length + salt?.length;

	if (keyLength < PASS_LENGTH + SALT_LENGTH) {
		throw new Error('Invalid key. It must has min 70 chars');
	}

	if(!password || password?.length < PASS_LENGTH){
	   throw new Error('Password not provided or Invalid value. It must has min 32 chars');
	}

	if (!salt || salt?.length < SALT_LENGTH) {
		throw new Error('Salt not provided or Invalid value. It must has min 38 chars');
	}
}
