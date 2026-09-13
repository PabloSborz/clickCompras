import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CheckoutStore } from '../../shared/checkout-store';

// Modelo das categorias exibidas no menu do cabecalho.
interface HeaderCategory {
    id: string;
    icon: string;
    label: string;
    description: string;
}

@Component({
    imports: [FormsModule, RouterLink],
    selector: 'app-header',
    styleUrl: './header.css',
    templateUrl: './header.html',
})
export class Header {
    // Estado global do carrinho usado para mostrar total e quantidade.
    readonly store = inject(CheckoutStore);

    // Router usado pela busca e pelos atalhos do menu de categorias.
    private readonly router = inject(Router);

    // Texto digitado na busca central do site.
    searchTerm = '';

    // Controla se o dropdown de categorias esta aberto.
    categoriesOpen = false;

    // Opcoes exibidas no botao personalizado de categorias.
    readonly categories: HeaderCategory[] = [
        {
            id: 'eletronicos',
            icon: 'EL',
            label: 'Eletronicos',
            description: 'Ofertas gerais',
        },
        {
            id: 'celulares',
            icon: 'CE',
            label: 'Celulares',
            description: 'Smartphones e acessorios',
        },
        {
            id: 'informatica',
            icon: 'IN',
            label: 'Informatica',
            description: 'Notebooks e trabalho',
        },
        {
            id: 'games',
            icon: 'GA',
            label: 'Games',
            description: 'Controles e consoles',
        },
    ];

    // Alterna a abertura do dropdown.
    toggleCategories(): void {
        this.categoriesOpen = !this.categoriesOpen;
    }

    // Fecha o dropdown quando uma categoria e escolhida ou quando o usuario aperta Escape.
    closeCategories(): void {
        this.categoriesOpen = false;
    }

    // Navega para o catalogo ja com a categoria selecionada como filtro.
    openCategory(categoryId: string): void {
        this.closeCategories();

        void this.router.navigate(['/catalogo'], {
            queryParams: { categoria: categoryId },
        });
    }

    // Envia o termo de busca para o catalogo usando query params.
    search(): void {
        const query = this.searchTerm.trim();
        let queryParams: { busca: string } | undefined = undefined;

        this.closeCategories();

        if (query) {
            queryParams = { busca: query };
        }

        void this.router.navigate(['/catalogo'], {
            queryParams,
        });
    }
}
