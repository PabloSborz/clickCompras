import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProdutoApiListResponse {
    id: number;
    nome: string;
    preco: number;
    urlImagem: string;
}

export interface ProdutoApiResponse {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    urlImagem: string;
}

export interface ProdutoApiRequest {
    nome: string;
    descricao: string;
    preco: number;
    urlImagem: string;
}

@Injectable({ providedIn: 'root' })
export class ProdutosApi {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/produtos';

    listarProdutos(): Observable<ProdutoApiListResponse[]> {
        return this.http.get<ProdutoApiListResponse[]>(this.apiUrl);
    }

    buscarProdutos(nome: string, descricao: string): Observable<ProdutoApiListResponse[]> {
        let params = new HttpParams();

        if (nome.trim()) {
            params = params.set('nome', nome.trim());
        }

        if (descricao.trim()) {
            params = params.set('descricao', descricao.trim());
        }

        return this.http.get<ProdutoApiListResponse[]>(this.apiUrl, { params });
    }

    buscarProdutoPorId(id: number): Observable<ProdutoApiResponse> {
        return this.http.get<ProdutoApiResponse>(`${this.apiUrl}/${id}`);
    }

    cadastrarProduto(produto: ProdutoApiRequest): Observable<ProdutoApiResponse> {
        return this.http.post<ProdutoApiResponse>(this.apiUrl, produto);
    }

    atualizarProduto(id: number, produto: ProdutoApiRequest): Observable<ProdutoApiResponse> {
        return this.http.put<ProdutoApiResponse>(`${this.apiUrl}/${id}`, produto);
    }

    apagarProduto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
