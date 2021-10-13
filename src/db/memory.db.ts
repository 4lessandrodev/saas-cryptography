export interface Key {
	session: string;
	value: string;
}

export class MemoryDB {
	private keys: Key[]=[];

	constructor(){
		this.keys = []
	}

	getKey(session: string): string {
		const result = this.keys.find((key) => key.session === session);
		return result?.value ?? '';
	}

	setKey(key: Key): void {
		this.keys = this.keys.filter((val) => val.session !== key.session);
		this.keys.push(key);
	}

	deleteKey(session: string): void {
		this.keys = this.keys.filter((val) => val.session !== session);
	}
}

export default MemoryDB;
