import { Injectable, computed, signal } from '@angular/core';

// Formas de pagamento aceitas pela tela de pagamento.
export type PaymentMethod = 'pix' | 'card' | 'boleto';

// Item do carrinho: usado em resumo, carrinho, checkout e confirmacao.
export interface CartItem {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

// Metodo de frete: altera o total do pedido.
export interface ShippingMethod {
    id: string;
    name: string;
    details: string;
    price: number;
}

// Endereco digitado no checkout e exibido na confirmacao.
export interface DeliveryAddress {
    fullName: string;
    cpf: string;
    phone: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}

// Carrinho inicial usado para simular uma compra real sem backend.
const initialItems: CartItem[] = [
    {
        id: 'clickbass-pro',
        image: '/controle2.png',
        name: 'Fone de Ouvido Wireless Premium ClickBass Pro',
        description: 'Cancelamento de ruido ativo, bateria de 40h.',
        price: 249.9,
        quantity: 1,
    },
    {
        id: 'active-fit-lite',
        image: '/celular2.png',
        name: 'Smartwatch Active Fit Lite v2 Monitor Cardiaco',
        description: 'Resistente a agua, multiplos modos esportivos.',
        price: 189.9,
        quantity: 2,
    },
    {
        id: 'pocketsound-15w',
        image: '/notebook2.png',
        name: 'Caixa de Som Bluetooth PocketSound Impermeavel 15W',
        description: 'Conexao rapida, graves reforcados.',
        price: 129.9,
        quantity: 1,
    },
];

// Endereco vazio usado antes do usuario preencher o checkout.
const emptyAddress: DeliveryAddress = {
    fullName: '',
    cpf: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
};

@Injectable({ providedIn: 'root' })
export class CheckoutStore {
    // Opcoes de entrega exibidas na tela de checkout.
    readonly shippingMethods: ShippingMethod[] = [
        {
            id: 'free',
            name: 'Frete Gratis',
            details: 'Entrega estimada em 7 a 12 dias uteis',
            price: 0,
        },
        {
            id: 'express',
            name: 'Envio Expresso',
            details: 'Entrega estimada em 3 a 5 dias uteis',
            price: 19.9,
        },
        {
            id: 'same-day',
            name: 'Same Day',
            details: 'Receba em ate 24 horas nas capitais',
            price: 29.9,
        },
    ];

    // Codigo PIX demonstrativo usado pelo botao de copiar.
    readonly pixCode =
        '00020126580014br.gov.bcb.pix0136clickcompras-2026-78531-75960-5204000053039865802BR5925Click Compras SA6009Sao Paulo62070503***6304A1B2';

    // Signals guardam o estado vivo do fluxo enquanto o usuario navega pelo site.
    readonly items = signal<CartItem[]>(this.copyInitialItems());
    readonly selectedShippingId = signal('free');
    readonly paymentMethod = signal<PaymentMethod>('pix');
    readonly address = signal<DeliveryAddress>({ ...emptyAddress });
    readonly billingSameAsDelivery = signal(true);
    readonly customerName = signal('');
    readonly orderNumber = signal('#CC-2026-78531');
    readonly orderDate = signal('11/09/2026');

    // Quantidade de linhas de produto no carrinho.
    readonly cartCount = computed(() => this.items().length);

    // Soma todas as unidades, considerando quantidade de cada item.
    readonly totalUnits = computed(() => this.calculateTotalUnits());

    // Soma preco vezes quantidade para formar o subtotal.
    readonly subtotal = computed(() => this.calculateSubtotal());

    // Busca o frete selecionado; se algo falhar, usa frete gratis como fallback.
    readonly selectedShipping = computed(() => this.findSelectedShipping());

    // Valores derivados que alimentam todos os cards de resumo.
    readonly shippingTotal = computed(() => this.selectedShipping().price);
    readonly discount = computed(() => 0);
    readonly total = computed(() => {
        const subtotal = this.subtotal();
        const shipping = this.shippingTotal();
        const discount = this.discount();

        return subtotal + shipping - discount;
    });

    // Atualiza a quantidade de um item sem deixar ficar menor que 1.
    updateQuantity(itemId: string, nextQuantity: number): void {
        const quantity = Math.max(1, nextQuantity);

        const newItems: CartItem[] = [];

        for (const item of this.items()) {
            if (item.id === itemId) {
                newItems.push({ ...item, quantity });
            } else {
                newItems.push(item);
            }
        }

        this.items.set(newItems);
    }

    // Adiciona item novo ou soma quantidade caso ele ja exista no carrinho.
    addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
        const nextQuantity = Math.max(1, quantity);
        const existing = this.findCartItem(item.id);

        if (existing) {
            this.updateQuantity(item.id, existing.quantity + nextQuantity);
            return;
        }

        const newItems = [...this.items()];
        newItems.push({ ...item, quantity: nextQuantity });
        this.items.set(newItems);
    }

    // Aumenta uma unidade no item informado.
    increase(itemId: string): void {
        const item = this.findCartItem(itemId);

        if (!item) {
            return;
        }

        this.updateQuantity(itemId, item.quantity + 1);
    }

    // Diminui uma unidade no item informado, respeitando o minimo de 1.
    decrease(itemId: string): void {
        const item = this.findCartItem(itemId);

        if (!item) {
            return;
        }

        this.updateQuantity(itemId, item.quantity - 1);
    }

    // Remove o produto inteiro do carrinho.
    removeItem(itemId: string): void {
        const newItems: CartItem[] = [];

        for (const item of this.items()) {
            if (item.id !== itemId) {
                newItems.push(item);
            }
        }

        this.items.set(newItems);
    }

    // Esvazia o carrinho na tela de carrinho.
    clearCart(): void {
        this.items.set([]);
    }

    // Restaura os itens demonstrativos para facilitar testes do fluxo.
    restoreCart(): void {
        this.items.set(this.copyInitialItems());
        this.selectedShippingId.set('free');
    }

    // Seleciona frete apenas se o id existir na lista oficial.
    selectShipping(methodId: string): void {
        for (const method of this.shippingMethods) {
            if (method.id === methodId) {
                this.selectedShippingId.set(methodId);
                return;
            }
        }
    }

    // Salva a forma de pagamento escolhida.
    selectPayment(method: PaymentMethod): void {
        this.paymentMethod.set(method);
    }

    // Guarda o endereco preenchido para a tela de confirmacao.
    saveAddress(address: DeliveryAddress): void {
        this.address.set({ ...address });
    }

    // Controla se cobranca usa o mesmo endereco de entrega.
    setBillingSameAsDelivery(value: boolean): void {
        this.billingSameAsDelivery.set(value);
    }

    // Simula login usando a parte antes do @ para montar o nome do cliente.
    signIn(email: string): void {
        let rawName = email.split('@')[0];

        rawName = rawName.replace(/[._-]+/g, ' ').trim();

        if (!rawName) {
            rawName = 'Cliente';
        }

        const parts = rawName.split(' ');
        const formattedParts: string[] = [];

        for (const part of parts) {
            if (part) {
                formattedParts.push(part.charAt(0).toUpperCase() + part.slice(1));
            }
        }

        const name = formattedParts.join(' ');

        this.customerName.set(name || 'Cliente');
    }

    // Gera numero e data do pedido no momento de finalizar.
    createOrder(): void {
        const nextNumber = Math.floor(10000 + Math.random() * 90000);
        const today = new Intl.DateTimeFormat('pt-BR').format(new Date());

        this.orderNumber.set(`#CC-2026-${nextNumber}`);
        this.orderDate.set(today);
    }

    // Formata valores numericos como moeda brasileira sem depender de pipes no template.
    formatCurrency(value: number): string {
        const [reais = '0', cents = '00'] = value.toFixed(2).split('.');
        const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return `R$ ${formattedReais},${cents}`;
    }

    private copyInitialItems(): CartItem[] {
        const copiedItems: CartItem[] = [];

        for (const item of initialItems) {
            copiedItems.push({ ...item });
        }

        return copiedItems;
    }

    private calculateTotalUnits(): number {
        let total = 0;

        for (const item of this.items()) {
            total += item.quantity;
        }

        return total;
    }

    private calculateSubtotal(): number {
        let subtotal = 0;

        for (const item of this.items()) {
            subtotal += item.price * item.quantity;
        }

        return subtotal;
    }

    private findSelectedShipping(): ShippingMethod {
        for (const method of this.shippingMethods) {
            if (method.id === this.selectedShippingId()) {
                return method;
            }
        }

        return this.shippingMethods[0];
    }

    private findCartItem(itemId: string): CartItem | undefined {
        for (const item of this.items()) {
            if (item.id === itemId) {
                return item;
            }
        }

        return undefined;
    }
}
