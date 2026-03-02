import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css'], // use styleUrl (singular) se seu projeto estiver em Angular 18 e configurado assim
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecuperarSenhaComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Informe um e-mail');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('E-mail inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  submit() {
    // apenas exemplo de submissão
    if (this.email.invalid) {
      this.email.markAsTouched();
      this.updateErrorMessage();
      return;
    }
    // TODO: chamar serviço de recuperação (ex.: this.auth.sendResetLink(this.email.value!))
    alert(`Se existir, enviaremos instruções para: ${this.email.value}`);
  }
}