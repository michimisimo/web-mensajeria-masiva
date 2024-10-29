import { Component, Input, Output, EventEmitter } from '@angular/core';
import { destinatario } from '../../interfaces/destinatario.interface';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-destinatario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-destinatario.component.html',
  styleUrls: ['./edit-destinatario.component.css']
})
export class EditDestinatarioComponent {
  @Input() destinatario!: destinatario;
  @Output() onSave = new EventEmitter<destinatario>(); // Emite el destinatario editado
  @Output() onClose = new EventEmitter<void>();

  save() {
    this.onSave.emit(this.destinatario); // Emite los nuevos datos
  }
}
