import { Component, Input, Output, EventEmitter } from '@angular/core';
import { campana } from '../../interfaces/campana.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-campana',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-campana.component.html',
  styleUrls: ['./create-campana.component.css']
})
export class CreateCampanaComponent {

  @Input() campana!: campana;
  @Output() onCreate = new EventEmitter<campana>();
  @Output() onClose = new EventEmitter<void>();

  currentDate: string;
  availableHours: string[] = [];

  constructor() {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD
    this.generateAvailableHours();//Obtener horas en el rango disponible
  }

  save() {    
    this.onCreate.emit(this.campana); // Emitir los datos de la nueva campaña
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
