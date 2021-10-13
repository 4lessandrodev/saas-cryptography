import { CipherGCMTypes, Encoding } from "crypto";

export const ALGORITHM: CipherGCMTypes = 'aes-256-gcm';
export const ENCRYPT_ENCODING_INPUT: Encoding = 'utf-8';
export const ENCRYPT_ENCODING_OUTPUT: Encoding = 'hex';
export const DECRYPT_ENCODING_INPUT: Encoding = 'hex';
export const DECRYPT_ENCODING_OUTPUT: Encoding = 'utf-8';
export const SALT = 'JHS9DF9668956SER89234';
export const KEY_LENGTH = 32;
