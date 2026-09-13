import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { TrustStrip } from '../../components/trust-strip/trust-strip';
import { CheckoutStore, PaymentMethod } from '../../shared/checkout-store';

@Component({
    imports: [FormsModule, RouterLink, Header, Footer, Newsletter, TopBar, TrustStrip],
    selector: 'app-pagamento',
    styleUrl: './pagamento.css',
    templateUrl: './pagamento.html',
})
export class Pagamento {
    // Store centraliza forma de pagamento, carrinho e total do pedido.
    readonly store = inject(CheckoutStore);

    // Router leva para a confirmacao quando o pedido e finalizado.
    private readonly router = inject(Router);

    // Estado visual do botao de copiar codigo PIX.
    readonly copied = signal(false);

    // Matriz simples usada para desenhar um QR Code demonstrativo em CSS.
    readonly qrCells = this.buildQrCells();

    // Campos do formulario de cartao quando essa opcao e selecionada.
    cardName = '';
    cardNumber = '';
    cardExpiry = '';
    cardCvv = '';
    installments = '1';

    // Troca a forma de pagamento ativa no store.
    selectPayment(method: PaymentMethod): void {
        this.store.selectPayment(method);
    }

    // Copia o codigo PIX para a area de transferencia quando o navegador permitir.
    copyPixCode(): void {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            void navigator.clipboard.writeText(this.store.pixCode);
        }

        this.copied.set(true);
        globalThis.setTimeout(() => this.copied.set(false), 1800);
    }

    // Gera o pedido demonstrativo e navega para a confirmacao.
    finishOrder(): void {
        this.store.createOrder();
        void this.router.navigate(['/confirmacao']);
    }

    // Cria um desenho de QR Code local sem precisar de imagem externa.
    private buildQrCells(): boolean[] {
        const cells: boolean[] = [];

        for (let row = 0; row < 15; row += 1) {
            for (let col = 0; col < 15; col += 1) {
                const topLeft = row < 5 && col < 5;
                const topRight = row < 5 && col > 9;
                const bottomLeft = row > 9 && col < 5;
                let finder = false;

                if (topLeft || topRight || bottomLeft) {
                    finder = row % 4 === 0 || col % 4 === 0 || (row % 4 === 2 && col % 4 === 2);
                }

                const texture = (row * 3 + col * 5 + row * col) % 7 < 3;

                cells.push(finder || texture);
            }
        }

        return cells;
    }
}
