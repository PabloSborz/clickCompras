import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { CheckoutStore } from '../../shared/checkout-store';

@Component({
    imports: [RouterLink, Header, Footer, Newsletter, TopBar],
    selector: 'app-pagina-inicial',
    styleUrl: './pagina-inicial.css',
    templateUrl: './pagina-inicial.html',
})
export class PaginaInicial {
    // Store permite que a vitrine inicial adicione produtos ao carrinho.
    readonly store = inject(CheckoutStore);

    // Adiciona o produto clicado sem disparar o routerLink do card.
    adicionarAoCarrinho(
        event: Event,
        id: string,
        image: string,
        name: string,
        price: number,
        description: string,
    ): void {
        event.preventDefault();
        event.stopPropagation();

        this.store.addItem({ id, image, name, price, description });
    }
}
