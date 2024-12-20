import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { ListaAgendaComponent } from './lista-agenda/lista-agenda.component';
import { RegistrarTurnoComponent } from './registrar-turno/registrar-turno.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'principal',
    component: PrincipalComponent,
  },
  {
    path: 'lista-agenda',
    component: ListaAgendaComponent,
  },
  {
    path: 'registrar-turno',
    component: RegistrarTurnoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
