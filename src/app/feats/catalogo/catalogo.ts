import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Newsletter } from '../../components/newsletter/newsletter';
import { TopBar } from '../../components/top-bar/top-bar';
import { CheckoutStore } from '../../shared/checkout-store';
import { ProdutoApiListResponse, ProdutosApi } from '../../shared/produtos-api';

// Produto do catalogo com os dados necessarios para filtros, busca e carrinho.
interface ProdutoCatalogo {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    inStock: boolean;
    freeShipping: boolean;
}

// Opcao visual de categoria usada no filtro lateral.
interface CatalogCategory {
    id: string;
    label: string;
}

const produtosExtras: ProdutoCatalogo[] = [
    {
        id: 'tablet-pro-desenho',
        image: 'celular2.png',
        name: 'Tablet Pro para desenho e estudos',
        description: 'Tela ampla, caneta precisa e bateria para o dia todo.',
        price: 2199.9,
        category: 'eletronicos',
        brand: 'Samsung',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'monitor-ultrawide-trabalho',
        image: 'notebook2.png',
        name: 'Monitor ultrawide para trabalho',
        description: 'Mais espaco para multitarefa e imagem nitida.',
        price: 1299.9,
        category: 'informatica',
        brand: 'Lenovo',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'teclado-mecanico-rgb',
        image: 'controle2.png',
        name: 'Teclado mecanico RGB compacto',
        description: 'Switches precisos e iluminacao personalizavel.',
        price: 349.9,
        category: 'informatica',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: false,
    },
    {
        id: 'mouse-gamer-precision',
        image: 'controle2.png',
        name: 'Mouse gamer de alta precisao',
        description: 'Sensor rapido e pegada confortavel para jogos.',
        price: 159.9,
        category: 'games',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'carregador-turbo-usb-c',
        image: 'celular2.png',
        name: 'Carregador turbo USB-C',
        description: 'Recarga rapida para celulares e acessorios.',
        price: 89.9,
        category: 'eletronicos',
        brand: 'Xiaomi',
        inStock: true,
        freeShipping: false,
    },
    {
        id: 'webcam-full-hd',
        image: 'notebook2.png',
        name: 'Webcam Full HD para reunioes',
        description: 'Imagem clara e microfone integrado para chamadas.',
        price: 229.9,
        category: 'eletronicos',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'notebook-ultrafino-premium',
        image: 'notebook2.png',
        name: 'Notebook ultrafino premium',
        description: 'Design leve com desempenho para produtividade.',
        price: 4899.9,
        category: 'informatica',
        brand: 'Apple',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'smartphone-bateria-max',
        image: 'celular2.png',
        name: 'Smartphone com bateria Max',
        description: 'Energia prolongada e tela fluida para rotina intensa.',
        price: 1699.9,
        category: 'celulares',
        brand: 'Xiaomi',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'controle-arcade-pro',
        image: 'controle2.png',
        name: 'Controle arcade Pro',
        description: 'Botoes resistentes para partidas competitivas.',
        price: 399.9,
        category: 'games',
        brand: 'Sony',
        inStock: true,
        freeShipping: false,
    },
    {
        id: 'headset-gamer-surround',
        image: 'controle2.png',
        name: 'Headset gamer surround',
        description: 'Audio imersivo e microfone flexivel.',
        price: 289.9,
        category: 'audio',
        brand: 'Sony',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'soundbar-compacta-tv',
        image: 'notebook2.png',
        name: 'Soundbar compacta para TV',
        description: 'Som potente em formato discreto para sala.',
        price: 599.9,
        category: 'audio',
        brand: 'Samsung',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'hub-casa-inteligente',
        image: 'celular2.png',
        name: 'Hub para casa inteligente',
        description: 'Controle lampadas, sensores e rotinas pelo app.',
        price: 249.9,
        category: 'eletronicos',
        brand: 'ClickTech',
        inStock: false,
        freeShipping: true,
    },
    {
        id: 'ssd-externo-1tb',
        image: 'notebook2.png',
        name: 'SSD externo portatil 1TB',
        description: 'Transferencia rapida para arquivos e backups.',
        price: 699.9,
        category: 'informatica',
        brand: 'Lenovo',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'smartphone-camera-pro',
        image: 'celular2.png',
        name: 'Smartphone Camera Pro',
        description: 'Lentes avancadas e modo noturno otimizado.',
        price: 2499.9,
        category: 'celulares',
        brand: 'Apple',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'controle-mobile-cloud',
        image: 'controle2.png',
        name: 'Controle mobile para cloud gaming',
        description: 'Encaixe ajustavel para jogar no celular.',
        price: 199.9,
        category: 'games',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: false,
    },
    {
        id: 'fone-esportivo-bluetooth',
        image: 'controle2.png',
        name: 'Fone esportivo Bluetooth',
        description: 'Resistente a suor e pronto para treinos.',
        price: 149.9,
        category: 'audio',
        brand: 'Xiaomi',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'roteador-wifi-mesh',
        image: 'notebook2.png',
        name: 'Roteador Wi-Fi mesh',
        description: 'Cobertura ampla e conexao estavel em casa.',
        price: 499.9,
        category: 'eletronicos',
        brand: 'Samsung',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'cadeira-gamer-ergonomica',
        image: 'controle2.png',
        name: 'Cadeira gamer ergonomica',
        description: 'Apoio confortavel para longas sessoes.',
        price: 1199.9,
        category: 'games',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: false,
    },
    {
        id: 'notebook-gamer-performance',
        image: 'notebook2.png',
        name: 'Notebook gamer performance',
        description: 'Graficos dedicados e resfriamento eficiente.',
        price: 4999.9,
        category: 'informatica',
        brand: 'Lenovo',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'celular-compacto-lite',
        image: 'celular2.png',
        name: 'Celular compacto Lite',
        description: 'Leve, agil e facil de usar todos os dias.',
        price: 799.9,
        category: 'celulares',
        brand: 'Samsung',
        inStock: true,
        freeShipping: false,
    },
    {
        id: 'microfone-usb-streaming',
        image: 'notebook2.png',
        name: 'Microfone USB para streaming',
        description: 'Voz limpa para lives, aulas e reunioes.',
        price: 319.9,
        category: 'audio',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'smartwatch-fit-pro',
        image: 'celular2.png',
        name: 'Smartwatch Fit Pro',
        description: 'Monitoramento de saude e notificacoes no pulso.',
        price: 449.9,
        category: 'eletronicos',
        brand: 'Xiaomi',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'kit-streamer-iniciante',
        image: 'notebook2.png',
        name: 'Kit streamer iniciante',
        description: 'Acessorios essenciais para montar seu setup.',
        price: 899.9,
        category: 'informatica',
        brand: 'ClickTech',
        inStock: true,
        freeShipping: true,
    },
    {
        id: 'controle-pro-edicao-limitada',
        image: 'controle2.png',
        name: 'Controle Pro edicao limitada',
        description: 'Acabamento premium e comandos personalizaveis.',
        price: 599.9,
        category: 'games',
        brand: 'Sony',
        inStock: false,
        freeShipping: true,
    },
];

@Component({
    imports: [FormsModule, Header, Footer, Newsletter, TopBar, RouterLink],
    selector: 'app-catalogo',
    styleUrl: './catalogo.css',
    templateUrl: './catalogo.html',
})
export class Catalogo {
    // Store compartilhado para formatar moeda e adicionar produtos ao carrinho.
    readonly store = inject(CheckoutStore);

    readonly produtosApi = inject(ProdutosApi);

    // Rota atual: le query params vindos do header, como categoria e busca.
    private readonly route = inject(ActivatedRoute);

    // Router usado para limpar query params quando o usuario limpa os filtros.
    private readonly router = inject(Router);

    // Lista de categorias exibidas no painel de filtros.
    readonly categorias: CatalogCategory[] = [
        { id: 'eletronicos', label: 'Eletronicos' },
        { id: 'celulares', label: 'Celulares' },
        { id: 'informatica', label: 'Informatica' },
        { id: 'games', label: 'Games' },
        { id: 'audio', label: 'Audio' },
    ];

    // Lista de marcas exibidas no painel de filtros.
    readonly marcas = ['ClickTech', 'Samsung', 'Apple', 'Xiaomi', 'Sony', 'Lenovo'];

    // Banco local de produtos enquanto nao existe API real.
    produtos: ProdutoCatalogo[] = [
        {
            id: 'controle-gamer-sem-fio',
            image: 'controle2.png',
            name: 'Controle gamer sem fio',
            description: 'Conexao Bluetooth e bateria recarregavel.',
            price: 179.9,
            category: 'games',
            brand: 'ClickTech',
            inStock: true,
            freeShipping: false,
        },
        {
            id: 'notebook-estudos',
            image: 'notebook2.png',
            name: 'Notebook para trabalho e estudos',
            description: 'Tela ampla e desempenho para rotina intensa.',
            price: 2999.9,
            category: 'informatica',
            brand: 'Lenovo',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'smartphone-hd',
            image: 'celular2.png',
            name: 'Smartphone com tela de alta definicao',
            description: 'Camera dupla, tela nitida e bateria de longa duracao.',
            price: 1499.9,
            category: 'celulares',
            brand: 'Samsung',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'controle-bluetooth',
            image: 'controle2.png',
            name: 'Controle gamer com conexao Bluetooth',
            description: 'Resposta rapida para jogos competitivos.',
            price: 219.9,
            category: 'games',
            brand: 'Sony',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'notebook-avancado',
            image: 'notebook2.png',
            name: 'Notebook com processador avancado',
            description: 'Ideal para produtividade e multitarefas.',
            price: 2499.9,
            category: 'informatica',
            brand: 'Apple',
            inStock: false,
            freeShipping: true,
        },
        {
            id: 'celular-dia-a-dia',
            image: 'celular2.png',
            name: 'Celular moderno para o dia a dia',
            description: 'Leve, rapido e pronto para fotos.',
            price: 899.9,
            category: 'celulares',
            brand: 'Xiaomi',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'controle-ultima-geracao',
            image: 'controle2.png',
            name: 'Controle para jogos de ultima geracao',
            description: 'Ergonomia premium e gatilhos precisos.',
            price: 749.9,
            category: 'games',
            brand: 'Sony',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'notebook-portatil',
            image: 'notebook2.png',
            name: 'Notebook compacto e portatil',
            description: 'Facil de transportar, potente para estudar.',
            price: 2799.9,
            category: 'informatica',
            brand: 'Lenovo',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'console-controle',
            image: 'controle2.png',
            name: 'Console e controle para jogos',
            description: 'Kit completo para entretenimento em casa.',
            price: 3999.9,
            category: 'games',
            brand: 'Sony',
            inStock: false,
            freeShipping: true,
        },
        {
            id: 'notebook-alto-desempenho',
            image: 'notebook2.png',
            name: 'Notebook com alto desempenho',
            description: 'Performance extra para apps pesados.',
            price: 3299.9,
            category: 'informatica',
            brand: 'Apple',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'celular-camera-avancada',
            image: 'celular2.png',
            name: 'Celular com camera avancada',
            description: 'Fotos vivas e video em alta qualidade.',
            price: 1249.9,
            category: 'celulares',
            brand: 'Samsung',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'controle-ergonomico',
            image: 'controle2.png',
            name: 'Controle gamer ergonomico',
            description: 'Conforto para longas partidas.',
            price: 219.9,
            category: 'games',
            brand: 'ClickTech',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'notebook-profissionais',
            image: 'notebook2.png',
            name: 'Notebook para profissionais',
            description: 'Mais memoria e armazenamento rapido.',
            price: 4499.9,
            category: 'informatica',
            brand: 'Lenovo',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'smartphone-premium',
            image: 'celular2.png',
            name: 'Smartphone premium',
            description: 'Design elegante e tela imersiva.',
            price: 1899.9,
            category: 'celulares',
            brand: 'Apple',
            inStock: false,
            freeShipping: true,
        },
        {
            id: 'clickbass-pro-catalogo',
            image: 'controle2.png',
            name: 'Fone de Ouvido Wireless Premium ClickBass Pro',
            description: 'Cancelamento de ruido ativo, bateria de 40h.',
            price: 249.9,
            category: 'audio',
            brand: 'ClickTech',
            inStock: true,
            freeShipping: true,
        },
        {
            id: 'speaker-pocketsound',
            image: 'notebook2.png',
            name: 'Caixa de Som Bluetooth PocketSound 15W',
            description: 'Audio potente em formato compacto.',
            price: 129.9,
            category: 'audio',
            brand: 'ClickTech',
            inStock: true,
            freeShipping: false,
        },
        ...produtosExtras,
    ];

    // Estado dos filtros selecionados pelo usuario.
    selectedCategories: string[] = [];
    selectedBrands: string[] = [];
    searchTerm = '';
    minPrice = 0;
    maxPrice = 5000;
    sortOption = 'relevantes';
    onlyInStock = false;
    onlyFreeShipping = false;

    // Lista renderizada na tela depois da aplicacao dos filtros.
    produtosFiltrados: ProdutoCatalogo[] = [...this.produtos];
    produtosPaginados: ProdutoCatalogo[] = [];
    paginationPages: number[] = [];
    currentPage = 1;
    readonly productsPerPage = 20;
    totalPages = 1;
    showPaginationStartEllipsis = false;
    showPaginationEndEllipsis = false;

    constructor() {
        // Sincroniza filtros quando o header envia /catalogo?categoria=... ou ?busca=...
        this.route.queryParamMap.subscribe((params) => {
            const category = params.get('categoria');
            const search = params.get('busca');
            const hasHeaderFilter = params.has('categoria') || params.has('busca');

            if (hasHeaderFilter) {
                this.selectedCategories = [];

                if (category && this.categoryExists(category)) {
                    this.selectedCategories = [category];
                }

                if (search) {
                    this.searchTerm = search;
                } else {
                    this.searchTerm = '';
                }
            }

            this.applyFilters();
        });

        this.carregarProdutosDaApi();
    }

    // Verifica se a categoria esta marcada no painel lateral.
    isCategorySelected(categoryId: string): boolean {
        for (const selectedCategory of this.selectedCategories) {
            if (selectedCategory === categoryId) {
                return true;
            }
        }

        return false;
    }

    // Verifica se a marca esta marcada no painel lateral.
    isBrandSelected(brand: string): boolean {
        for (const selectedBrand of this.selectedBrands) {
            if (selectedBrand === brand) {
                return true;
            }
        }

        return false;
    }

    // Marca ou desmarca uma categoria e atualiza a grade.
    toggleCategory(categoryId: string, event: Event): void {
        const checked = (event.target as HTMLInputElement).checked;

        this.selectedCategories = this.toggleValue(this.selectedCategories, categoryId, checked);
        this.applyFilters();
    }

    // Marca ou desmarca uma marca e atualiza a grade.
    toggleBrand(brand: string, event: Event): void {
        const checked = (event.target as HTMLInputElement).checked;

        this.selectedBrands = this.toggleValue(this.selectedBrands, brand, checked);
        this.applyFilters();
    }

    // Recalcula a lista visivel com busca, preco, categoria, marca e disponibilidade.
    applyFilters(): void {
        const normalizedSearch = this.normalize(this.searchTerm);
        const min = Number(this.minPrice) || 0;
        const max = Number(this.maxPrice) || 5000;
        const lowPrice = Math.min(min, max);
        const highPrice = Math.max(min, max);

        const filtered: ProdutoCatalogo[] = [];

        for (const produto of this.produtos) {
            const searchable = this.normalize(
                `${produto.name} ${produto.description} ${produto.brand}`,
            );
            const matchesSearch = !normalizedSearch || searchable.includes(normalizedSearch);
            const matchesCategory =
                this.selectedCategories.length === 0 ||
                this.hasValue(this.selectedCategories, produto.category);
            const matchesBrand =
                this.selectedBrands.length === 0 || this.hasValue(this.selectedBrands, produto.brand);
            const matchesPrice = produto.price >= lowPrice && produto.price <= highPrice;
            const matchesStock = !this.onlyInStock || produto.inStock;
            const matchesShipping = !this.onlyFreeShipping || produto.freeShipping;

            if (
                matchesSearch &&
                matchesCategory &&
                matchesBrand &&
                matchesPrice &&
                matchesStock &&
                matchesShipping
            ) {
                filtered.push(produto);
            }
        }

        this.produtosFiltrados = this.sortProducts(filtered);
        this.currentPage = 1;
        this.updatePagination();
    }

    // Limpa todos os filtros e tambem remove query params vindos do header.
    clearFilters(): void {
        this.selectedCategories = [];
        this.selectedBrands = [];
        this.searchTerm = '';
        this.minPrice = 0;
        this.maxPrice = 5000;
        this.sortOption = 'relevantes';
        this.onlyInStock = false;
        this.onlyFreeShipping = false;

        void this.router.navigate(['/catalogo']);
        this.applyFilters();
    }

    // Adiciona um produto do catalogo ao carrinho sem navegar para detalhes.
    adicionarAoCarrinho(event: Event, produto: ProdutoCatalogo): void {
        event.preventDefault();
        event.stopPropagation();

        this.store.addItem({
            id: produto.id,
            image: this.productImage(produto.image),
            name: produto.name,
            description: produto.description,
            price: produto.price,
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

    goToPage(page: number): void {
        if (page < 1) {
            this.currentPage = 1;
        } else if (page > this.totalPages) {
            this.currentPage = this.totalPages;
        } else {
            this.currentPage = page;
        }

        this.updatePagination();
    }

    previousPage(): void {
        this.goToPage(this.currentPage - 1);
    }

    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }

    // Mostra um texto curto com a categoria usada no card do produto.
    categoryLabel(categoryId: string): string {
        for (const category of this.categorias) {
            if (category.id === categoryId) {
                return category.label;
            }
        }

        return categoryId;
    }

    // Alterna valores em arrays de checkbox mantendo o estado imutavel.
    private toggleValue(values: string[], value: string, checked: boolean): string[] {
        const newValues: string[] = [];

        for (const item of values) {
            if (item !== value) {
                newValues.push(item);
            }
        }

        if (checked) {
            newValues.push(value);
        }

        return newValues;
    }

    private updatePagination(): void {
        this.totalPages = Math.ceil(this.produtosFiltrados.length / this.productsPerPage);

        if (this.totalPages < 1) {
            this.totalPages = 1;
        }

        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        const start = (this.currentPage - 1) * this.productsPerPage;
        const end = start + this.productsPerPage;
        this.produtosPaginados = [];

        for (let index = start; index < end; index += 1) {
            if (index < this.produtosFiltrados.length) {
                this.produtosPaginados.push(this.produtosFiltrados[index]);
            }
        }

        this.updatePaginationButtons();
    }

    private updatePaginationButtons(): void {
        this.paginationPages = [];

        if (this.totalPages <= 3) {
            for (let page = 1; page <= this.totalPages; page += 1) {
                this.paginationPages.push(page);
            }
        } else if (this.currentPage <= 2) {
            this.paginationPages.push(1, 2, 3);
        } else if (this.currentPage >= this.totalPages - 1) {
            this.paginationPages.push(this.totalPages - 2, this.totalPages - 1, this.totalPages);
        } else {
            this.paginationPages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
        }

        this.showPaginationStartEllipsis = false;
        this.showPaginationEndEllipsis = false;

        if (this.paginationPages.length > 0 && this.paginationPages[0] > 1) {
            this.showPaginationStartEllipsis = true;
        }

        if (
            this.paginationPages.length > 0 &&
            this.paginationPages[this.paginationPages.length - 1] < this.totalPages
        ) {
            this.showPaginationEndEllipsis = true;
        }
    }

    private categoryExists(categoryId: string): boolean {
        for (const category of this.categorias) {
            if (category.id === categoryId) {
                return true;
            }
        }

        return false;
    }

    private hasValue(values: string[], value: string): boolean {
        for (const item of values) {
            if (item === value) {
                return true;
            }
        }

        return false;
    }

    private carregarProdutosDaApi(): void {
        this.produtosApi.listarProdutos().subscribe({
            next: (produtosApi) => {
                if (produtosApi.length === 0) {
                    return;
                }

                const produtosConvertidos: ProdutoCatalogo[] = [];

                for (const produtoApi of produtosApi) {
                    produtosConvertidos.push(this.converterProdutoApi(produtoApi));
                }

                this.produtos = produtosConvertidos;
                this.applyFilters();
            },
            error: () => {
                this.applyFilters();
            },
        });
    }

    private converterProdutoApi(produtoApi: ProdutoApiListResponse): ProdutoCatalogo {
        const produto: ProdutoCatalogo = {
            id: String(produtoApi.id),
            image: produtoApi.urlImagem,
            name: produtoApi.nome,
            description: 'Produto carregado da API de produtos.',
            price: produtoApi.preco,
            category: this.discoverCategory(produtoApi.nome),
            brand: 'ClickTech',
            inStock: true,
            freeShipping: true,
        };

        return produto;
    }

    private discoverCategory(name: string): string {
        const text = this.normalize(name);

        if (text.includes('celular') || text.includes('smartphone')) {
            return 'celulares';
        }

        if (text.includes('notebook') || text.includes('monitor') || text.includes('teclado')) {
            return 'informatica';
        }

        if (text.includes('controle') || text.includes('gamer') || text.includes('console')) {
            return 'games';
        }

        if (text.includes('fone') || text.includes('som') || text.includes('audio')) {
            return 'audio';
        }

        return 'eletronicos';
    }

    // Remove acentos e caixa alta para a busca ser mais permissiva.
    private normalize(value: string): string {
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    // Ordena uma copia da lista filtrada sem alterar o banco local original.
    private sortProducts(products: ProdutoCatalogo[]): ProdutoCatalogo[] {
        const sorted = [...products];

        if (this.sortOption === 'menor-preco') {
            return sorted.sort((a, b) => a.price - b.price);
        }

        if (this.sortOption === 'maior-preco') {
            return sorted.sort((a, b) => b.price - a.price);
        }

        if (this.sortOption === 'nome') {
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }

        return sorted;
    }
}
