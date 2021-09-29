import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicBookComponent } from './music-book/music-book.component';

const routes: Routes = [
    {
        path: '',
        component: MusicBookComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicBookRoutingModule { }
