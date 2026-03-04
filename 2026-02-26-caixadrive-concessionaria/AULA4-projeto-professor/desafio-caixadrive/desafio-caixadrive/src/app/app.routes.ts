import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { consorcioResolver } from './resolvers/consorcio.resolver';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: 'catalogo',
        loadComponent: () =>
            import('./features/catalogo/catalogo.component')
            .then(m => m.CatalogoComponent),
            canActivate: [authGuard],
            resolve: {
                estoque: consorcioResolver
            }
    },
    {
        path: 'perfil',
        loadComponent: () =>
            import('./features/perfil/perfil.component')
            .then(m => m.PerfilComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
