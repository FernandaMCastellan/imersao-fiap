import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
}}
