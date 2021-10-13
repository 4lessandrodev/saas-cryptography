import DecryptService from "@app/services/decrypt-service";
import EncryptService, { IEncrypt } from "@app/services/encrypt-service";
import EncrypterParams from '@app/services/encrypter-params';
import { PASS_LENGTH, SALT_LENGTH } from "@app/config/env";
import { KeyHelper } from '@app/helpers/key.util';

export class Encrypter {
	private static encrypter: Encrypter;
	private _key: string;
	private readonly _encrypt: typeof EncryptService;
	private readonly _decrypt: typeof DecryptService;
	private readonly _keyHelper: KeyHelper;
	
	private constructor(){
		this._decrypt = DecryptService;
		this._encrypt = EncryptService;
		this._keyHelper = new KeyHelper();
		this._key = this._keyHelper.generateKey();
	}

	async encrypt<T>(params: EncrypterParams<T>): Promise<IEncrypt> {
		const salt = this._keyHelper.extractSaltFromKey(this._key);
		const password = this._keyHelper.extractPassFromKey(this._key);
		return this._encrypt<T>({ ...params, password, salt});
	}

	async decrypt<T>(params: EncrypterParams<T>): Promise<T> {
		const salt = this._keyHelper.extractSaltFromKey(this._key);
		const password = this._keyHelper.extractPassFromKey(this._key);
		return this._decrypt<T>({ ...params, password, salt});
	}

	setKey(key: string): void {
		const minLength = PASS_LENGTH + SALT_LENGTH;
		if(!key || key.length < minLength){
			throw new Error(`Invalid key. It must has min ${minLength} chars`)
		}
		this._key = key;
	}

	get key(): string {
		return this._key;
	}

	public static init():Encrypter {
		const hasInitialized = Encrypter.encrypter;
		if(!hasInitialized){
			Encrypter.encrypter = new Encrypter();
		}
		return Encrypter.encrypter;
	}
}
