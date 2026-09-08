import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaInicial } from "./feats/pagina-inicial/pagina-inicial";

@Component({
  imports: [RouterOutlet, PaginaInicial],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('clickCompras');
}
