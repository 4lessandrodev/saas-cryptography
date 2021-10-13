export interface Key {
	tag: string;
	value: string;
}

export class MemoryDB {
	private keys: Key[]=[];

	constructor(){
		this.keys = []
	}

	getKey(tag: string): string {
		const result = this.keys.find((key) => key.tag === tag);
		return result?.value ?? '';
	}

	setKey(key: Key): void {
		this.keys = this.keys.filter((val) => val.tag !== key.tag);
		this.keys.push(key);
	}

	deleteKey(tag: string): void {
		this.keys = this.keys.filter((val) => val.tag !== tag);
	}
}

export default MemoryDB;
