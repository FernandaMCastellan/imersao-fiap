import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private usuarioLogado: any = null;

  constructor(private http: HttpClient) { }

  login(email: string, senha: string){
    return this.http.get<any[]>('assets/data/usuarios.json')
  }

  isAuthenticated():boolean {
    const usuario = localStorage.getItem('usuarioLogado');

    return !!usuario // igual a retornar usuario true ou false. se tem u não usuario logado.
  }
}
