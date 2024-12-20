import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from '../service/local-storage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  urlFrame: any = '';
  lblUsername: any = '';
  token: any = '';
  imgUser: any =
    'data:image/png;base64,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';
  constructor(
    private sanitizer: DomSanitizer,
    private localStorageService: LocalStorageService,
    private Mensaje: MensajesSwalComponent,
    private apiService: ApiService
  ) {}
  username: any = '';
  ngOnInit(): void {
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/lista-agenda');
    this.username = this.localStorageService.getItem('usuarioIngreso');
    this.token = this.localStorageService.getItem('token');
    this.lblUsername = this.username;
    setInterval(() => {
      this.ActualizarTurnos();
    }, 3000);
  }
  Salir() {
    this.Mensaje.MensajeSalida();
  }
  ListaTurnos() {
    this.Mensaje.Cargando();
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/lista-agenda');
  }
  RegistrarTurno() {
    this.Mensaje.Cargando();
    this.urlFrame =
      this.sanitizer.bypassSecurityTrustResourceUrl('/registrar-turno');
  }
  ActualizarTurnos() {
    this.apiService
      .ActualizarVigenciaTurnos(this.token)
      .subscribe((res: any) => {
        let _resultado = '';
        _resultado = res.resultado.resultado;
        if (_resultado == 'Se han vencido los turnos') {
          this.ListaTurnos();
        }
      });
  }
}
