import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule} from '@angular/material/card'
import { CurrencyPipe } from '@angular/common';
import {NgFor} from '@angular/common'


@Component({
  selector: 'app-catalogo',
  standalone:true,
  imports: [MatCardModule, CurrencyPipe, NgFor],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  veiculos: any[] =[];

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
    this.veiculos = this.route.snapshot.data['estoque'];
  }
}
