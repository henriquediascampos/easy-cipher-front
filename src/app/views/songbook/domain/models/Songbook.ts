import { CustomCipher } from './CustomCipher';
export interface Songbook {
    id: string;
    title: string;
    vision: string;
    ciphers: CustomCipher[];
}
