import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    imports: [FormsModule],
    selector: 'app-newsletter',
    styleUrl: './newsletter.css',
    templateUrl: './newsletter.html',
})
export class Newsletter {
    email = '';
    message = '';

    subscribe(): void {
        const value = this.email.trim();
        const atPosition = value.indexOf('@');
        const dotPosition = value.lastIndexOf('.');
        const hasTextBeforeAt = atPosition > 0;
        const hasTextBetweenAtAndDot = dotPosition > atPosition + 1;
        const hasTextAfterDot = dotPosition < value.length - 1;

        if (!hasTextBeforeAt || !hasTextBetweenAtAndDot || !hasTextAfterDot) {
            this.message = 'Digite um e-mail valido.';
            return;
        }

        this.message = 'Cadastro realizado!';
        this.email = '';
    }
}
