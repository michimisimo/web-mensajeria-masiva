import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { destinatario } from '../../interfaces/destinatario.interface';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
  
})
export class ShowListComponent {
  @Input() isModalOpen: boolean = false; 
  @Input() listDest: destinatario[] = []; 
  @Input() campanaSelected: number = 0; 
  @Input() nombreCampana: string = '';
  @Output() onClose = new EventEmitter<void>();

  cantDest: number = this.listDest.length;

  constructor(private serviceDif: ServiceDifusionService) {}

  ngOnInit(): void {    
    this.mostrarDetDif(this.campanaSelected);
  }

  capitalize(text: string): string {
    if (!text) return '';
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }


  formatRut(rut: string): string {
    if (!rut) return '';
    const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedRut;
  }

  eliminarDestinatario(destinatario: destinatario) {
    console.log('campaña:', this.campanaSelected);
    console.log('rut:', destinatario.rut);
    const confirmacion = confirm(`¿Está seguro de que desea eliminar 
      "${destinatario.nombre} ${destinatario.snombre} ${destinatario.appaterno} ${destinatario.apmaterno} - RUT: ${this.formatRut(destinatario.rut)}-${destinatario.dvrut} "?`);
    if (confirmacion){
      this.serviceDif.borrarDif(this.campanaSelected, destinatario.rut).subscribe({
        next: (response) => {
          console.log('destinatario eliminado de la difusión con éxito', response);
          this.mostrarDetDif(this.campanaSelected); // Actualiza la lista de destinatarios
        },
        error: (error) => {
          console.log('error al eliminar destinatario de la difusión', error);
        }
      });
    }    
  }

  mostrarDetDif(idCampana: number) {
    this.listDest = [];
    this.serviceDif.getDetalleDifusion(idCampana).subscribe({
      next: (response) => {
        this.listDest = response || [];
        console.log('listDest', this.listDest);
        this.cantDest = this.getCantDest(this.listDest);
      },
      error: (error) => {
        console.log('error al obtener detalle de difusión', error);
      }
    });
  }

  getCantDest(list: destinatario[]){
    const cantDest = list.length;
    return cantDest;
  }
}
