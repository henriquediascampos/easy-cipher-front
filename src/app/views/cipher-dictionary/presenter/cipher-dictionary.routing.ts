import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CipherDictionaryComponent } from './cipher-dictionary/cipher-dictionary.component';

export const routes: Routes = [
    {
        path: '',
        component: CipherDictionaryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CipherDictionaryRouting {}
