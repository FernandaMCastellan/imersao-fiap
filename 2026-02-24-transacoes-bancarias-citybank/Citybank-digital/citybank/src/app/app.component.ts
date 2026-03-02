import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt)

type Tipo = 'entrada' | 'saída';

interface Transacao {
  descricao: string;
  valor: number;
  tipo: Tipo;
  data: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'citybank';

  filtro: 'todos' | Tipo = 'todos';

  transacoes: Transacao[] = [
    { descricao: "Crédito Salário", valor: 5000, tipo: 'entrada', data: "13 FEV" },
    { descricao: "Pagamento Luz", valor: 250, tipo: 'saída', data: "14 FEV" },
    { descricao: "Pagamento Gás", valor: 50, tipo: 'saída', data: "14 FEV" },
    { descricao: "Aluguel", valor: 1550, tipo: 'saída', data: "28 FEV" },
    { descricao: "Mercado ZS", valor: 350, tipo: 'saída', data: "28 FEV" }
  ];

  get transacoesFiltradas() {
    return this.filtro === 'todos'
      ? this.transacoes
      : this.transacoes.filter(t => t.tipo === this.filtro);
  }

  get saldo() {
    return this.transacoes.reduce((total, t) => {
      return t.tipo === 'entrada' ? total + t.valor : total - t.valor;
    }, 0);
  }

  mudarFiltro(tipo: 'todos' | Tipo) {
    this.filtro = tipo;
  }
}