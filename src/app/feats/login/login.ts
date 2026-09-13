import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { TrustStrip } from '../../components/trust-strip/trust-strip';
import { CheckoutStore } from '../../shared/checkout-store';

@Component({
    imports: [FormsModule, Header, Footer, Newsletter, TopBar, TrustStrip],
    selector: 'app-login',
    styleUrl: './login.css',
    templateUrl: './login.html',
})
export class Login {
    // Store salva o nome do usuario apos o login simulado.
    readonly store = inject(CheckoutStore);

    // Router redireciona para checkout ou catalogo apos entrar.
    private readonly router = inject(Router);

    // Controla se a senha aparece como texto ou senha.
    readonly showPassword = signal(false);

    // Estado e campos do formulario de login.
    submitted = false;
    email = '';
    password = '';
    remember = true;

    // Alterna visibilidade da senha.
    togglePassword(): void {
        this.showPassword.update((value) => !value);
    }

    // Valida o formulario e simula login com e-mail.
    login(isValid: boolean | null): void {
        this.submitted = true;

        if (!isValid) {
            return;
        }

        this.store.signIn(this.email);
        this.goAfterLogin();
    }

    // Simula login por provedor externo.
    socialLogin(provider: string): void {
        this.store.signIn(`${provider}@clickcompras.local`);
        this.goAfterLogin();
    }

    // Decide o destino apos login: checkout se houver carrinho, senao catalogo.
    private goAfterLogin(): void {
        let page = '/catalogo';

        if (this.store.cartCount() > 0) {
            page = '/checkout';
        }

        void this.router.navigate([page]);
    }
}
