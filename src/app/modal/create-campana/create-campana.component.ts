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

  currentDate: string = '';

  constructor() {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
  }

  save() {    
    this.onCreate.emit(this.campana); // Emite los datos de la nueva campaña
  }  

}
