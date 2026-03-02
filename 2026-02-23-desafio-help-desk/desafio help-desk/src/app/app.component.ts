
import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports:[FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {

  posts =signal ([
    {titulo:"Ticket Pendente 1",conteudo:'Detalhes '},
    {titulo:"Ticket Pendente 2",conteudo:'Detalhes '},
  ]);

 
  novoCliente =signal('');
  novaOcorrencia =signal('');

  postEditado = signal<any>(null);

  adicionarTicket(){
    if(this.novoCliente() && this.novaOcorrencia()){
    
      this.posts.update(lista=>[
        {titulo: this.novoCliente(), conteudo: this.novaOcorrencia()},
        ...lista
      ]);
      this.novoCliente.set('');
      this.novaOcorrencia.set('');
    }else{
      alert("Preencha todos os campos")
    }
  }

  excluirPost(postRemover:any){

    this.posts.update(listaAtual=>listaAtual.filter(post =>post !== postRemover)
    );
  }

  editarPost(post:any){
    this.postEditado.set(post);
    this.novoCliente.set(post.titulo);
    this.novaOcorrencia.set(post.conteudo);
  }


  salvarEditar(){
    this.posts.update(lista =>{
      return lista.map(p =>{
        if(p === this.postEditado()){
          return {titulo:this.novoCliente(), conteudo: this.novaOcorrencia()};
        }
        return p;
         })
    });


    this.cancelarEdicao();
  }



  cancelarEdicao(){
    this.postEditado.set(null);
    this.novoCliente.set('');
    this.novaOcorrencia.set('');
  }

}
