import { Songbook } from './Songbook';
import { Cipher } from './Cipher';

export interface CustomCipher {
    id: string
    customTone: string
    cipher: Cipher
    songbook: Songbook
}
