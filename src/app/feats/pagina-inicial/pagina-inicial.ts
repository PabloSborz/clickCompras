import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';

@Component({
  imports: [RouterLink, Header, Footer, Newsletter, TopBar],
  selector: 'app-pagina-inicial',
  styleUrl: './pagina-inicial.css',
  templateUrl: './pagina-inicial.html',
})
export class PaginaInicial {}
