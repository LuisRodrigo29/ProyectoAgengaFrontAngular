import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URLAPI = 'https://localhost:44315/api';
  constructor(private http: HttpClient) {}

  public Login(data: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(`${this.URLAPI}/Login`, data, { headers });
  }

  public ObtenerTurnos(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.URLAPI}/${encodeURIComponent('Turno')}/ObtenerTurnos`,
      {
        headers,
      }
    );
  }
  public ObtenerTurnosXCedula(data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.URLAPI}/Turno/ObtenerTurnoXCedula`, data, {
      headers,
    });
  }

  public ObtenerSucursales(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.URLAPI}/${encodeURIComponent('Turno')}/ObtenerSucursales`,
      {
        headers,
      }
    );
  }

  public CrearTurno(token: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.URLAPI}/Turno/GuardarTurno`, data, {
      headers,
    });
  }
  public ActualizarTurno(token: any, idTurno: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(
      `${this.URLAPI}/Turno/ActualizarTurno?idTurno=` + idTurno,
      data,
      {
        headers,
      }
    );
  }

  public ActualizarVigenciaTurnos(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(
      `${this.URLAPI}/${encodeURIComponent('Turno')}/ActualizarVigencia`,
      {
        headers,
      }
    );
  }
}
