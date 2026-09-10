import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';

type ProdutoCatalogo = readonly [imagem: string, nome: string, preco: string];

@Component({
    imports: [Header, Footer, Newsletter, TopBar, RouterLink],
    selector: 'app-catalogo',
    styleUrl: './catalogo.css',
    templateUrl: './catalogo.html',
})
export class Catalogo {
    // Dados temporários exibidos no catálogo até a integração com API.
    readonly produtos: ProdutoCatalogo[] = [
        ['controle2.png', 'Controle gamer sem fio', 'R$ 179,90'],
        ['notebook2.png', 'Notebook para trabalho e estudos', 'R$ 2.999,90'],
        ['celular2.png', 'Smartphone com tela de alta definição', 'R$ 1.499,90'],
        ['controle2.png', 'Controle gamer com conexão Bluetooth', 'R$ 219,90'],
        ['notebook2.png', 'Notebook com processador avançado', 'R$ 2.499,90'],
        ['celular2.png', 'Celular moderno para o dia a dia', 'R$ 899,90'],
        ['controle2.png', 'Controle para jogos de última geração', 'R$ 749,90'],
        ['notebook2.png', 'Notebook compacto e portátil', 'R$ 2.799,90'],
        ['controle2.png', 'Console e controle para jogos', 'R$ 3.999,90'],
        ['notebook2.png', 'Notebook com alto desempenho', 'R$ 3.299,90'],
        ['celular2.png', 'Celular com câmera avançada', 'R$ 1.249,90'],
        ['controle2.png', 'Controle gamer ergonômico', 'R$ 219,90'],
        ['notebook2.png', 'Notebook para profissionais', 'R$ 4.499,90'],
        ['celular2.png', 'Smartphone premium', 'R$ 1.899,90'],
        ['notebook2.png', 'Notebook com tela ampla', 'R$ 3.699,90'],
        ['controle2.png', 'Controle gamer inteligente', 'R$ 329,90'],
    ];
}
