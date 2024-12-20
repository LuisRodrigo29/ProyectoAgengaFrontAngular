import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/local-storage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  login = {
    usuario: '',
    contrasena: '',
  };
  response: any;
  imgLogin: any;
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private mensaje: MensajesSwalComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.response = {};
    this.imgLogin =
      'https://img.freepik.com/vector-premium/logotipo-simbolo-icono-marca-verificacion-verde-circulo-ilustracion-vector-color-verde-simbolo-garrapata_685751-503.jpg';
  }

  Login() {
    if (this.login.usuario != '' && this.login.contrasena != '') {
      this.apiService.Login(this.login).subscribe((res: any) => {
        this.response = res;
        this.redirigir(this.response);
      });
    } else if (this.login.usuario == '' && this.login.contrasena != '') {
      this.mensaje.MostrarMensaje(
        'error',
        'Error',
        'El campo usuario no puede ir vacio'
      );
    } else {
      this.mensaje.MostrarMensaje(
        'error',
        'Error',
        'El campo contraseña no puede ir vacio'
      );
    }
  }

  redirigir(response: any) {
    if (response.resultado.state == 200) {
      this.localStorage.setItem('token', response.resultado.token);
      this.localStorage.setItem('usuarioIngreso', this.login.usuario);
      this.mensaje.MostrarMensaje(
        'success',
        'Usuario correcto',
        'Bienvenido Sr/ Sra ' + this.login.usuario
      );
      this.router.navigate(['principal']);
    }
  }
}
