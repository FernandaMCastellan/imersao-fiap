import { Component, } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { ReservaService } from '../../core/reserva/reserva.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CurrencyPipe,
    CommonModule, 
    MatCardModule ,
    MatButtonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  constructor( private reservaService: ReservaService){}
 usuario: any;

 reservas: any[] = []
 ngOnInit(){
  
   const dados = localStorage.getItem('usuarioLogado');

  if(dados){
    this.usuario = JSON.parse(dados);
  }

  this.reservas = this.reservaService.listarReservas()
 }
}
