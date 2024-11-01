import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceDifusionService {
  private apiUrl = 'http://localhost:3003/';

  constructor(private http: HttpClient) { }

  getDifusion(): Observable<any> {
    return this.http.get(this.apiUrl + 'getDif')
  }

  getDetalleDifusion(idCampana: number): Observable<any> {
    return this.http.get(this.apiUrl + 'getDetDif/' + idCampana)
  }

  subirDifusion(idCampana: number, ruts: { ruts: string[] }): Observable<any> {
    return this.http.post(this.apiUrl + 'crearDif/' + idCampana, ruts)
  }

  borrarDif(idCampana: number, rut: string): Observable<any> {
    console.log('rut en service:', rut)
    return this.http.put(this.apiUrl + 'delDif/' + idCampana, { rut })
  }
}
