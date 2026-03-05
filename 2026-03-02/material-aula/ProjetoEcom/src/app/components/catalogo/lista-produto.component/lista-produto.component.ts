
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoService } from '../../../core/services/produto.service';
import { Produto } from '../../../models/produto'; 
import { FavoritoService } from '../../../core/services/favorito.service';


@Component({
  selector: 'app-produto-lista', 
  standalone: true, // Componente autossuficiente, padrão moderno do Angular.
  
  // Registra as ferramentas que o HTML vai usar. Sem o AsyncPipe, o Angular não saberia ler o Observable.
  imports: [AsyncPipe, CurrencyPipe, RouterModule],
  
  templateUrl: './lista-produto.component.html'
})
export class ProdutoListaComponent implements OnDestroy{

  private servicoProduto = inject(ProdutoService);

  private favoritosService = inject(FavoritoService);
  private timeoutNotificacao: ReturnType<typeof setTimeout> | null = null;
  
  produtos$: Observable<Produto[]> = this.servicoProduto.obterProdutos();

  mostrarNotificacaoFavorito = signal(false);
  
  alternarFavorito(produtoId: number){
    const foiAdicionado = this.favoritosService.alternarFavorito(produtoId);

    if(foiAdicionado){
      this.exibirNotificacao();
    }
  }

  produtoEFavorito(produtoId:number):boolean {
    return this.favoritosService.isFavorito(produtoId);
  }

  ngOnDestroy(): void {
    if(this.timeoutNotificacao){
      clearTimeout(this.timeoutNotificacao);
    }
  }

  private exibirNotificacao(){
    this.mostrarNotificacaoFavorito.set(true);

    if(this.timeoutNotificacao){
      clearTimeout(this.timeoutNotificacao);
    }
    this.timeoutNotificacao = setTimeout(()=>{
      this.mostrarNotificacaoFavorito.set(false);
    }, 2200)
  }
}