import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro.component',
  standalone:true,
  imports: [ReactiveFormsModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
private fb = inject(FormBuilder)

form = this.fb.group({
  name: [''],
  email: [''],
  password: [''],
  role: ['user']
});

  ngOnInit() {
    console.log(this.form);
  }


      onSubmit() {

  const novoUsuario = {
    id: crypto.randomUUID(),
    token: '',
    ...this.form.getRawValue()
  };

  const usuariosSalvos = localStorage.getItem('usuarios');

  const listaUsuarios = usuariosSalvos
    ? JSON.parse(usuariosSalvos)
    : [];

  listaUsuarios.push(novoUsuario);

  localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

  console.log('Usuário salvo com sucesso!', listaUsuarios);

}}


