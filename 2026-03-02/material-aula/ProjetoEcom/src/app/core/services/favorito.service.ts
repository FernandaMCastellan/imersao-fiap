import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritoService {
  private readonly storageKey = 'favoritos_produto';
  private favoritosIds = signal<number[]>(this.getFromStorage());

  quantidadeFavoritos = computed(() => this.favoritosIds().length);

  constructor() {
    effect(()=> {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favoritosIds()));
    });
   
  }

  isFavorito(produtoId: number): boolean {
      return this.favoritosIds().includes(produtoId);
    }

    alternarFavorito(produtoId: number){
      this.favoritosIds.update(listaAtual=>{
        if(listaAtual.includes(produtoId)){
          return listaAtual.filter((id)=> id !== produtoId)
        } 
        return [...listaAtual, produtoId];
      });
    }


    private getFromStorage(): number[]{
      const data = localStorage.getItem(this.storageKey);

      if(!data){
        return [];
      }

      try{
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'number') : [];
      } catch {
        return [];
      }
    }
}

