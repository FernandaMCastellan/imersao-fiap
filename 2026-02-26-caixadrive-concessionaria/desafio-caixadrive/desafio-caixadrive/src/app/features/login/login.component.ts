import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ReservaService } from '../../core/reserva/reserva.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private reservaService: ReservaService
  ) {}

  ngOnInit(){
    this.formLogin = this.fb.group({
      email: [""],
      senha: [""]
    })
  }

  login(){
    console.log("LOGIN FOI CHAMADO")
    const email = this.formLogin.value.email;
    const senha = this.formLogin.value.senha;

    this.authService.login(email, senha).subscribe(usuarios => {
        console.log("usuarios carregados:", usuarios);
        
        const usuario = usuarios.find( u => u.email === email && u.senha===senha)

         console.log("Usuario encontrado:", usuario);

        if(usuario){
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        console.log("Login realizado");
        this.router.navigate(['/catalogo']);
        
      }else{
        console.log("Usuário inválido");
        
      }
    })
}
  reservas: any[] = [];


}
