import { Component, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-root',
  imports: [
            ReactiveFormsModule,  
            CommonModule,
            CurrencyPipe         
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   title = 'loja'
  private contadorId = 1;

  //signals
  cliente = signal<string | null> (null);
  produtos = signal<Produto[]> ([]);

  //forms

  formCliente: FormGroup;
  formProduto: FormGroup;

  constructor(private fb:FormBuilder){
    this.formCliente = this.fb.group({
      nome: ['', Validators.required]
    });

    this.formProduto = this.fb.group({
      nome:['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0.01)]]
    });

    //metodos    
    }

    clienteCadastrado(){
      return this.cliente();
    }

    listaProdutos(){
      return this.produtos();
    }

    salvarCliente(){
      if(this.formCliente.valid){
        this.cliente.set(this.formCliente.value.nome);
        this.formCliente.reset();
      }
    }

    adicionarProduto(){
      if(this.formProduto.valid){
        const novoProduto: Produto = {
          id: this.contadorId++,
          nome: this.formProduto.value.nome,
          preco: this.formProduto.value.preco
        };

        this.produtos.update(lista => [...lista, novoProduto]);
        this.formProduto.reset();
      }
    }

    excluirProduto(id:number){
      this.produtos.update(lista => lista.filter(p=> p.id !==id));
  }

}
