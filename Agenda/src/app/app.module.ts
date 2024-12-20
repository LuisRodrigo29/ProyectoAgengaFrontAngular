import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { ListaAgendaComponent } from './lista-agenda/lista-agenda.component';
import { RegistrarTurnoComponent } from './registrar-turno/registrar-turno.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MensajesSwalComponent } from './mensajes-swal/mensajes-swal.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    ListaAgendaComponent,
    RegistrarTurnoComponent,
    MensajesSwalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbPaginationModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    MensajesSwalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
