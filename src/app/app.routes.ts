import { Routes } from '@angular/router';
import { PaginaInicial } from './feats/pagina-inicial/pagina-inicial';
import { Catalogo } from './feats/catalogo/catalogo';
import { DetalhesProduto } from './feats/detalhes-produto/detalhes-produto';

export const routes: Routes = [
  { path: '', component: PaginaInicial },
  { path: 'catalogo', component: Catalogo },
  { path: 'detalhes-produto', component: DetalhesProduto },
];
