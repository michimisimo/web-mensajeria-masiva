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
    this.onSave.emit(this.campana); // Emite los nuevos datos
  }
  
}
