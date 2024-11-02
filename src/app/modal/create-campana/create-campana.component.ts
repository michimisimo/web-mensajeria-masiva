import { Component, Input, Output, EventEmitter } from '@angular/core';
import { campana } from '../../interfaces/campana.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { email } from '../../interfaces/email.interface';

@Component({
  selector: 'app-create-campana',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-campana.component.html',
  styleUrls: ['./create-campana.component.css']
})
export class CreateCampanaComponent {

  @Input() campana!: campana;
  @Output() onCreate = new EventEmitter<{ campana: campana, email: email }>();
  @Output() onClose = new EventEmitter<void>();

  currentDate: string;
  availableHours: string[] = [];

  email: email = {
    asunto: '',
    contenido: '',
    correo_remitente: "send@massive.com"
};

  constructor() {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD
    this.generateAvailableHours();//Obtener horas en el rango disponible
  }

  save() {      
    const combinedData = {
      campana: this.campana,
      email: this.email
    };

    this.onCreate.emit(combinedData); 
  }
  
  generateAvailableHours() {
    const startHour = 8; // 08:00
    const endHour = 22; // 22:00

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes of [0, 15, 30, 45]) {
        if (hour === endHour && minutes > 0) break; // Evitar horas después de 22:00
        this.availableHours.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      }
    }
  }

}
