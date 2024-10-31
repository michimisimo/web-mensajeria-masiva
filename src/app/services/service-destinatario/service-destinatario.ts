import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { destinatario } from '../../interfaces/destinatario.interface';

@Injectable({
  providedIn: 'root'  // Asegurarse de que el servicio esté disponible globalmente
})
export class ServiceDestinatarioService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUrl + 'subirExcel', formData);
  }

  getDest(): Observable<any> {
    return this.http.get(this.apiUrl + 'getDest');
  }

  // Método para subir un destinatario a la API
  subirDestinatario(destinatario: destinatario): Observable<any> {
    return this.http.post(this.apiUrl + 'addDest', destinatario);
  }

  editarDestinatario(destinatario: destinatario) {
    return this.http.patch(`${this.apiUrl}updateDestInfo/${destinatario.rut}`, destinatario);
  }
}