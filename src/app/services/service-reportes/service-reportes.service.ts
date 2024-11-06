import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceReportesService {

  private apiUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient) { }

  getReporte(idCampana: number): Observable<any> {
    return this.http.get(this.apiUrl + 'getReporteEnv/' + idCampana);
  }

}


