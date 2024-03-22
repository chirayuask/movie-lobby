import CryptoJS from "crypto-js"
import { secretKeys } from "../Config/env"

export class SecurityService {
    private keys: string = secretKeys.CRYPTO_SECRET_KEY
    private values: string
    constructor (value: string) {
        this.values = value
    }

    set () {
        const parsedKey = CryptoJS.enc.Utf8.parse(this.keys);
        const iv = CryptoJS.enc.Utf8.parse(this.keys);
        const parsedValue = CryptoJS.enc.Utf8.parse(String(this.values));
        const encrypted = CryptoJS.AES.encrypt(parsedValue, parsedKey, {
            keySize : 128 / 8,
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
        // Convert to Base64
        return Buffer.from(String(encrypted)).toString('base64');

    }

    get () {
        let value = Buffer.from(this.values, 'base64').toString('utf-8');
        const parsedKey = CryptoJS.enc.Utf8.parse(this.keys);
        const iv = CryptoJS.enc.Utf8.parse(this.keys);

        const decrypted = CryptoJS.AES.decrypt(value, parsedKey, {
            keySize : 128 / 8,
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return decrypted.toString(CryptoJS.enc.Utf8);

    }
}