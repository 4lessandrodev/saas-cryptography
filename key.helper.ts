import { generateKey } from "crypto";

export class KeyHelper {
    private readonly dicSize:number;
    private readonly dictionary: string[] = [];

    constructor(){
      this.dictionary = [
        '#','@','%','*','&','!','+','?',';',
        'A', 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','X','Y','Z','W','0','1','2','3','4','5','6','7','8','9',
        '#','@','%','*', '&','!','+','.','{','}','?',';',',',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
        't','u','v','x','y','z','#','@','%','*','&','!','+','.','{','}','?',';'
    ];
      this.dicSize =  this.dictionary.length - 1;
    }

    extractPassFromKey(key: string): string {
        return key.slice(0, 32);
    }

    generatePass(): string {
        let pass = '';
        while(pass.length <= 32){
            pass += this.dictionary[Math.floor(Math.random() * this.dicSize)];
        }
        return pass;
    }

    generateSalt(): string {
        let salt = '';
        while(salt.length <= 38){
            salt += this.dictionary[Math.floor(Math.random() * this.dicSize)];
        }
        return salt;
    }

    generateKey(): string {
        const pass = this.generatePass();
        const salt = this.generateSalt();
        const key = pass + salt;
        return key;
    }

    extractSaltFromKey(key: string): string {
        return key.slice(32)
    }
}
