import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule} from '@angular/material/card'
import { CurrencyPipe } from '@angular/common';
import {NgFor} from '@angular/common'
import { ReservaService } from '../../core/reserva/reserva.service';
import {MatButtonModule} from '@angular/material/button';




@Component({
  selector: 'app-catalogo',
  standalone:true,
  imports: [MatCardModule, CurrencyPipe, NgFor, MatButtonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  veiculos: any[] =[];

  constructor(
    private route: ActivatedRoute, 
    private reservaService: ReservaService
  ) {  }

  ngOnInit(){
    this.veiculos = this.route.snapshot.data['estoque'];
  }

  reservarCarro(carro:any){
    this.reservaService.salvarReserva(carro);
    alert("Veículo reservadom com sucesso!")

  }
}
