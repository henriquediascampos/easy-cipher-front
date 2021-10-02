import { Songbook } from './Songbook';
import { Cipher } from './Cipher';

export interface CustomCipher {
    customTone: string
    cipher: Cipher
    songbook: Songbook
}
