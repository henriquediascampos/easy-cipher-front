import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssembleSongbookComponent } from './assemble-songbook/assemble-songbook.component';
import { SongbookComponent } from './songbook/songbook.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'assemble-songbook',
        pathMatch: 'full'
    },
    {
        path: 'assemble-songbook',
        component: AssembleSongbookComponent,
    },
    {
        path: 'songbook',
        component: SongbookComponent,
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SongbookRoutingModule { }
