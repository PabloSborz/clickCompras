import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { TrustStrip } from '../../components/trust-strip/trust-strip';
import { CheckoutStore, DeliveryAddress } from '../../shared/checkout-store';

@Component({
    imports: [FormsModule, RouterLink, Header, Footer, Newsletter, TopBar, TrustStrip],
    selector: 'app-checkout',
    styleUrl: './checkout.css',
    templateUrl: './checkout.html',
})
export class Checkout {
    // Store guarda endereco, frete e totais usados no fluxo todo.
    readonly store = inject(CheckoutStore);

    // Router envia o usuario para pagamento quando o formulario esta valido.
    private readonly router = inject(Router);

    // Controla quando a mensagem de erro deve aparecer.
    submitted = false;

    // Copia local do endereco para permitir edicao antes de salvar no store.
    address: DeliveryAddress = { ...this.store.address() };

    // Valida o formulario, salva o endereco e avanca para a tela de pagamento.
    continueToPayment(isValid: boolean | null): void {
        this.submitted = true;

        if (!isValid) {
            return;
        }

        this.store.saveAddress(this.address);
        void this.router.navigate(['/pagamento']);
    }
}
