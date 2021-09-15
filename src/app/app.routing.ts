import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesGuard } from './core/guards/routes.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        canActivate: [RoutesGuard],
        loadChildren: () =>
            import('./views/home/home.module').then(
                (module) => module.HomeModule
            ),
    },
    {
        path: 'ciphers-factory',
        canActivate: [RoutesGuard],
        loadChildren: () =>
            import('./views/ciphers-factory/ciphers-factory.module').then(
                (module) => module.CiphersFactoryModule
            ),
    },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            relativeLinkResolution: 'legacy',
            // enableTracing: true,
        }),
    ],
    // { enableTracing: true }, // <-- debugging purposes only
    exports: [RouterModule],
    providers: [RoutesGuard],
})
export class AppRoutingModule {}
