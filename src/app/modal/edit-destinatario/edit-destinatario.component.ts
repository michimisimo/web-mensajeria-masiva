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

  tempNombre: string = '';
  tempSnombre: string = '';
  tempAppaterno: string = '';
  tempApmaterno: string = '';
  tempEmail: string = '';

  ngOnInit(): void {    
    // Al inicializar, convierte los nombres a capitalizado
    this.tempNombre = this.capitalize(this.destinatario.nombre);
    this.tempSnombre = this.capitalize(this.destinatario.snombre);
    this.tempAppaterno = this.capitalize(this.destinatario.appaterno);
    this.tempApmaterno = this.capitalize(this.destinatario.apmaterno);
    this.tempEmail = this.destinatario.email.toLowerCase();
  }


  capitalize(text: string): string {
    if (!text) return '';
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  save() {
    this.destinatario.nombre = this.tempNombre;
    this.destinatario.snombre = this.tempSnombre;
    this.destinatario.appaterno = this.tempAppaterno;
    this.destinatario.apmaterno = this.tempApmaterno;
    this.destinatario.email = this.tempEmail; 
    this.onSave.emit(this.destinatario); // Emite los nuevos datos
  }
}
