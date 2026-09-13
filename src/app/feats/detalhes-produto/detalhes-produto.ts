import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { CheckoutStore } from '../../shared/checkout-store';
import { ProdutoApiResponse, ProdutosApi } from '../../shared/produtos-api';

type ProdutoRelacionado = readonly [imagem: string, nome: string, preco: number];

@Component({
    imports: [RouterLink, Header, Footer, Newsletter, TopBar],
    selector: 'app-detalhes-produto',
    styleUrl: './detalhes-produto.css',
    templateUrl: './detalhes-produto.html',
})
export class DetalhesProduto {
    readonly store = inject(CheckoutStore);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly produtosApi = inject(ProdutosApi);

    quantity = 1;

    produto = {
        id: 'clickbass-pro',
        image: '/controle2.png',
        name: 'Fone de Ouvido Wireless Premium ClickBass Pro',
        description: 'Cancelamento de ruido ativo, bateria de 40h.',
        price: 249.9,
    };

    readonly relacionados: ProdutoRelacionado[] = [
        ['controle2.png', 'Controle gamer sem fio', 179.9],
        ['notebook2.png', 'Notebook para trabalho e estudos', 2999.9],
        ['celular2.png', 'Smartphone com tela de alta definicao', 1499.9],
        ['controle2.png', 'Controle gamer com conexao Bluetooth', 219.9],
    ];

    constructor() {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');

            if (!id) {
                return;
            }

            const apiId = Number(id);

            if (Number.isNaN(apiId)) {
                return;
            }

            this.buscarProdutoNaApi(apiId);
        });
    }

    decrease(): void {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }
    }

    increase(): void {
        this.quantity += 1;
    }

    addToCart(): void {
        this.store.addItem(this.produto, this.quantity);
    }

    buyNow(): void {
        this.addToCart();
        void this.router.navigate(['/checkout']);
    }

    addRelatedToCart(produtoRelacionado: ProdutoRelacionado): void {
        const productName = produtoRelacionado[1];
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        const productImage = `/${produtoRelacionado[0]}`;
        const productPrice = produtoRelacionado[2];

        this.store.addItem({
            id: productId,
            image: productImage,
            name: productName,
            description: 'Produto relacionado selecionado no detalhe.',
            price: productPrice,
        });
    }

    productImage(image: string): string {
        if (!image) {
            return '/controle2.png';
        }

        if (image.startsWith('http')) {
            return image;
        }

        if (image.startsWith('/')) {
            return image;
        }

        return `/${image}`;
    }

    private buscarProdutoNaApi(id: number): void {
        this.produtosApi.buscarProdutoPorId(id).subscribe({
            next: (produtoApi) => {
                this.usarProdutoDaApi(produtoApi);
            },
            error: () => {
                this.quantity = 1;
            },
        });
    }

    private usarProdutoDaApi(produtoApi: ProdutoApiResponse): void {
        this.produto = {
            id: String(produtoApi.id),
            image: produtoApi.urlImagem,
            name: produtoApi.nome,
            description: produtoApi.descricao,
            price: produtoApi.preco,
        };

        this.quantity = 1;
    }
}
