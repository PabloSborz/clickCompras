import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { TrustStrip } from '../../components/trust-strip/trust-strip';
import { CheckoutStore } from '../../shared/checkout-store';

@Component({
    imports: [RouterLink, Header, Footer, Newsletter, TopBar, TrustStrip],
    selector: 'app-confirmacao',
    styleUrl: './confirmacao.css',
    templateUrl: './confirmacao.html',
})
export class Confirmacao {
    // Store fornece pedido, endereco, produtos e totais para a confirmacao.
    readonly store = inject(CheckoutStore);

    // Mostra ou esconde a mensagem simulada de rastreamento.
    readonly trackingVisible = signal(false);

    // Traduz o id interno da forma de pagamento para texto de tela.
    readonly paymentLabel = computed(() => {
        const method = this.store.paymentMethod();

        if (method === 'card') {
            return 'Cartao de Credito';
        }

        if (method === 'boleto') {
            return 'Boleto Bancario';
        }

        return 'PIX';
    });

    // Exibe o aviso de acompanhamento do pedido.
    showTracking(): void {
        this.trackingVisible.set(true);
    }
}
