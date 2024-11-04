import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceEnvioService {

  private apiUrl = 'http://localhost:3002/';

  constructor(private http: HttpClient) { }

  borrarEnv(idDifusion: number): Observable<any> {
    return this.http.put(this.apiUrl + 'delEnv/' + idDifusion, {})
  }
}
