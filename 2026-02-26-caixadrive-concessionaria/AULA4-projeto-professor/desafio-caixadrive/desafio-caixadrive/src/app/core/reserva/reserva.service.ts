import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

    salvarReserva(carro:any){
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

      reservas.push(carro);

      localStorage.setItem('reservas', JSON.stringify(reservas));
    }

    listarReservas(){
      return JSON.parse(localStorage.getItem('reservas') || '[]');
    }
  constructor() { }
}
