import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { TrustStrip } from '../../components/trust-strip/trust-strip';
import { CheckoutStore } from '../../shared/checkout-store';

@Component({
    imports: [RouterLink, Header, Footer, Newsletter, TopBar, TrustStrip],
    selector: 'app-carrinho',
    styleUrl: './carrinho.css',
    templateUrl: './carrinho.html',
})
export class Carrinho {
    // Store compartilhado com itens, totais e acoes do carrinho.
    readonly store = inject(CheckoutStore);
}
