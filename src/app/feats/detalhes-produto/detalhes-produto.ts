import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';

@Component({
  imports: [RouterLink, Header, Footer, Newsletter, TopBar],
  selector: 'app-detalhes-produto',
  styleUrl: './detalhes-produto.css',
  templateUrl: './detalhes-produto.html',
})
export class DetalhesProduto {
  readonly relacionados = [
    ['controle2.png', 'Controle gamer sem fio', 'R$ 179,90'],
    ['notebook2.png', 'Notebook para trabalho e estudos', 'R$ 2.999,90'],
    ['celular2.png', 'Smartphone com tela de alta definição', 'R$ 1.499,90'],
    ['controle2.png', 'Controle gamer com conexão Bluetooth', 'R$ 219,90'],
  ];
}
