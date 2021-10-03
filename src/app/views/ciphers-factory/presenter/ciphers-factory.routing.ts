import { CipherListComponent } from './cipher-list/cipher-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiphersFactoryComponent } from './ciphers-factory/ciphers-factory.component';

export const routes: Routes = [
    {
        path: '',
        component: CipherListComponent,
    },
    {
        path: 'ciphers-factory',
        component: CiphersFactoryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CiphersFactoryRouting {}
