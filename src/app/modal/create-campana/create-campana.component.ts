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

  get capitalizedNombre(): string {
    return this.campana.nombre
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  save() {    
    console.log("Campaña antes de enviarla en save(): "+JSON.stringify(this.campana));
    this.onCreate.emit(this.campana); // Emite los datos de la nueva campaña
  }

}
