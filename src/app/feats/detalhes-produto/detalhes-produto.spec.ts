import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetalhesProduto } from './detalhes-produto';

describe('DetalhesProduto', () => {
    let component: DetalhesProduto;
    let fixture: ComponentFixture<DetalhesProduto>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DetalhesProduto],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(DetalhesProduto);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
