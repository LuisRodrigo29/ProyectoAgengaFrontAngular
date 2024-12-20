import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../service/api.service';
import { LocalStorageService } from '../service/local-storage.service';
import { MensajesSwalComponent } from '../mensajes-swal/mensajes-swal.component';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html',
  styleUrl: './lista-agenda.component.css',
})
export class ListaAgendaComponent implements OnInit {
  ListaAgendaTurnos: any = [];
  ResponseTable: any = [];
  ListaTurnoXCedula: any = [];
  _datepicker!: NgbDateStruct;
  placement: any;
  turno = {
    operacion: '',
    cedula: '',
    nombre: '',
    fecha_turno: '',
    id_sucursal: '0',
    descripcion: '',
    idTurno: '0',
  };
  TurnoView = '';
  sucursalView = '';
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  countListAgenda = 0;
  closeResult = '';
  token: any = '';
  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private mensaje: MensajesSwalComponent,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.token = this.localStorage.getItem('token');
    this.placement = 'bottom';
    this.CargarTurnos();
  }

  CargarTurnos() {
    this.apiService.ObtenerTurnos(this.token).subscribe((res: any) => {
      this.VisualizarTurnos(res.resultadoLista);
    });
  }
  refreshTable() {
    this.ListaAgendaTurnos = this.ResponseTable.map((turno: any, i: any) => ({
      id: i + 1,
      ...turno,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  VisualizarTurnos(data: any) {
    this.countListAgenda = data.length;
    this.ResponseTable = data;
    this.collectionSize = this.countListAgenda;
    this.ListaAgendaTurnos = data;
    this.refreshTable();
  }
  Eliminar(cedula: any) {
    this.mensaje.MostrarMensaje(
      'warning',
      'Construcción',
      'Función en construcción'
    );
  }
  TurnoXCedula(cedula: any, fechaTurno: any, idTurno: any) {
    this.turno.cedula = cedula;
    this.turno.operacion = '3';
    this.turno.fecha_turno = fechaTurno;
    this.turno.idTurno = idTurno;
    // consumo a la api para poder obtener el tunro por cedula y alojarlo en un array resultante
    this.apiService
      .ObtenerTurnosXCedula(this.turno, this.token)
      .subscribe((res: any) => {
        this.MostrarCampos(res.resultadoLista);
      });
  }
  MostrarCampos(data: any) {
    let fechaCorta = data[0].fechaCorta;
    let fechaCortaEnPartes = fechaCorta.split('-');
    this.turno.cedula = data[0].cedula;
    this.turno.nombre = data[0].nombre;
    this.turno.fecha_turno = data[0].fechaCorta;
    this._datepicker = this.PartDate(fechaCortaEnPartes);
    this.turno.id_sucursal = '0';
    this.turno.idTurno = data[0].idTurno;
    this.sucursalView = data[0].sucursal;
    this.turno.descripcion = data[0].descripcion;
    this.TurnoView = data[0].turno;
  }
  PartDate(datePart: any): NgbDateStruct {
    let Date: NgbDateStruct;
    Date = {
      year: +datePart[0],
      month: +datePart[1],
      day: +datePart[2],
    };
    return Date;
  }
  OpenDialog(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.Actualizar();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  private Actualizar() {
    this.turno.operacion = '2';
    this.apiService
      .ActualizarTurno(this.token, this.turno.idTurno, this.turno)
      .subscribe((res: any) => {
        this.MensajeResultadoActualizar(res.resultado);
      });
  }
  private MensajeResultadoActualizar(data: any) {
    this.mensaje.MostrarMensaje('info', 'Turno modificado', data.resultado);
    this.CargarTurnos();
  }
}
