import { Component, Input, Output, EventEmitter } from '@angular/core';
import { campana } from '../../interfaces/campana.interface';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-campana',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-campana.component.html',
  styleUrls: ['./edit-campana.component.css']
})
export class EditCampanaComponent {
  @Input() campana!: campana;
  @Output() onSave = new EventEmitter<campana>();
  @Output() onClose = new EventEmitter<void>();

  tempNombre: string = '';

  ngOnInit() {
    // Al inicializar, convierte el nombre a capitalizado
    this.tempNombre = this.campana.nombre
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  save() {
    this.onSave.emit(this.campana); // Emite los nuevos datos
  }
  
}
