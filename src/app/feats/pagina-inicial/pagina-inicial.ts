import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Catalogo } from '../catalogo/catalogo';

@Component({
  imports: [Header, Footer, Catalogo],
  selector: 'app-pagina-inicial',
  styleUrl: './pagina-inicial.css',
  templateUrl: './pagina-inicial.html',
})
export class PaginaInicial {}
