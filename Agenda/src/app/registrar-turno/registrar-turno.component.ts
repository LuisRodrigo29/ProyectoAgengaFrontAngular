import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/local-storage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';

@Component({
  selector: 'app-registrar-turno',
  templateUrl: './registrar-turno.component.html',
  styleUrl: './registrar-turno.component.css',
})
export class RegistrarTurnoComponent implements OnInit {
  _datepicker!: NgbDateStruct;
  placement: any;
  formatDate: any;
  turno = {
    operacion: '',
    cedula: '',
    nombre: '',
    fecha_turno: '',
    id_sucursal: '',
    descripcion: '',
    idTurno: '0',
  };
  responseSucursal: any;

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private mensaje: MensajesSwalComponent
  ) {}
  ngOnInit(): void {
    this.turno.id_sucursal = '0';
    this.placement = 'bottom';
    this.responseSucursal = [];
    this.CargarSucursal();
    if (this._datepicker == undefined) {
      this.formatDate = '';
    }
  }

  CargarSucursal() {
    let token = this.localStorageService.getItem('token');
    this.apiService.ObtenerSucursales(token).subscribe((res: any) => {
      this.VisualizarSucursales(res.resultadoLista);
    });
  }

  VisualizarSucursales(data: any) {
    this.responseSucursal = data;
  }
  RegistrarTurno() {
    let token = this.localStorageService.getItem('token');
    this.turno.operacion = '1';
    this.formatDate = this.ExtraerFecha(this._datepicker);
    this.turno.fecha_turno = this.formatDate.toString();
    this.apiService.CrearTurno(token, this.turno).subscribe((res: any) => {
      this.VisualizarResultado(res.resultado);
    });
  }
  VisualizarResultado(data: any) {
    if (
      data.resultado.includes('Turno registrado con exitó') == true ||
      data.resultado.includes('Usuario y turno registrado con exitó') == true
    ) {
      this.mensaje.MostrarMensaje('success', 'Exitó', data.resultado);
    } else {
      this.mensaje.MostrarMensaje('error', 'Error', data.resultado);
    }
    this.LimpiarCampos();
  }
  ExtraerFecha(fecha: any): any {
    let _fecha: any;
    if (fecha != undefined) {
      if (fecha.month <= 9 && fecha.day <= 9) {
        _fecha = fecha.year + '-' + '0' + fecha.month + '-' + '0' + fecha.day;
      } else if (fecha.month <= 9 && fecha.day > 9) {
        _fecha = fecha.year + '-' + '0' + fecha.month + '-' + fecha.day;
      } else if (fecha.month > 9 && fecha.day <= 9) {
        _fecha = fecha.year + '-' + fecha.month + '-' + '0' + fecha.day;
      } else {
        _fecha = fecha.year + '-' + fecha.month + '-' + fecha.day;
      }
    } else {
      _fecha = '';
    }
    return _fecha;
  }
  LimpiarCampos() {
    this.turno.cedula = '';
    this.turno.nombre = '';
    this.turno.fecha_turno = '';
    this.turno.id_sucursal = '0';
    this.turno.descripcion = '';
    this._datepicker = { year: 0, month: 0, day: 0 };
  }
}
