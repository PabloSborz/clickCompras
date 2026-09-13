import { Routes } from '@angular/router';
import { PaginaInicial } from './feats/pagina-inicial/pagina-inicial';
import { Catalogo } from './feats/catalogo/catalogo';
import { Carrinho } from './feats/carrinho/carrinho';
import { Checkout } from './feats/checkout/checkout';
import { Confirmacao } from './feats/confirmacao/confirmacao';
import { DetalhesProduto } from './feats/detalhes-produto/detalhes-produto';
import { Login } from './feats/login/login';
import { Pagamento } from './feats/pagamento/pagamento';

export const routes: Routes = [
    { path: '', component: PaginaInicial },
    { path: 'catalogo', component: Catalogo },
    { path: 'detalhes-produto/:id', component: DetalhesProduto },
    { path: 'detalhes-produto', component: DetalhesProduto },
    { path: 'carrinho', component: Carrinho },
    { path: 'checkout', component: Checkout },
    { path: 'pagamento', component: Pagamento },
    { path: 'confirmacao', component: Confirmacao },
    { path: 'login', component: Login },
    { path: '**', redirectTo: '' },
];
