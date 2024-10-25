import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGestCamapanaService {

  private apiUrl = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }

  getCam(): Observable<any> {
    return this.http.get(this.apiUrl + 'getCampanas');
  }

}


