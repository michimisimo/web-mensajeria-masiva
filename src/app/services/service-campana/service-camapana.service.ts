import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { campana } from '../../interfaces/campana.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceCamapanaService {

  private apiUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }

  getCam(): Observable<any> {
    return this.http.get(this.apiUrl + 'getCampanas');
  }

  editarCampana(campana: campana) {
    return this.http.patch(`${this.apiUrl}updateCampana/${campana.id_campana}`, campana);
  }

}


