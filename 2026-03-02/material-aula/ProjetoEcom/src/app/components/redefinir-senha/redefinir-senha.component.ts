import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-redefinir-senha.component',
  imports: [ReactiveFormsModule],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css',
})
export class RedefinirSenhaComponent {
  private fb = inject(FormBuilder)
form = this.fb.group({
  email: [''],
  novaSenha: [''],
  confirmarSenha: [''],
})

onSubmit() {

  const { email, novaSenha, confirmarSenha } = this.form.getRawValue();

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem');
    return;
  }

  const usuariosSalvos = localStorage.getItem('usuarios');

  if (!usuariosSalvos) {
    alert('Nenhum usuário encontrado');
    return;
  }

  const listaUsuarios = JSON.parse(usuariosSalvos);

  const usuarioIndex = listaUsuarios.findIndex(
    (user: any) => user.email === email
  );

  if (usuarioIndex === -1) {
    alert('Email não encontrado');
    return;
  }

  listaUsuarios[usuarioIndex].password = novaSenha;

  localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

  alert('Senha redefinida com sucesso!');
}
}
