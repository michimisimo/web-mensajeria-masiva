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

  save() {
    this.updateTipoCampanaNombre();
    this.onSave.emit(this.campana); // Emite los nuevos datos
  }

  private updateTipoCampanaNombre() {
    if (this.campana.id_tipo_campana === 1) {
      this.campana.nombre_tipo_campana = 'SMS';
    } else if (this.campana.id_tipo_campana === 2) {
      this.campana.nombre_tipo_campana = 'Email';
    }
  }

  
}
