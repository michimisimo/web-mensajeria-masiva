import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { destinatario } from '../../interfaces/destinatario.interface';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';
import { ServiceEnvioService } from '../../services/service-envio/service-envio.service';

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

  constructor(private serviceDif: ServiceDifusionService, private serviceEnv : ServiceEnvioService) {}

  ngOnInit(): void {    
    this.mostrarDetDif(this.campanaSelected);
  }

  capitalize(text: string): string {
    if (!text) return '';
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  toLower(text: string): string{
    if (!text) return '';
    return text.toLowerCase();
  }


  formatRut(rut: string): string {
    if (!rut) return '';
    const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedRut;
  }

  async eliminarDestinatario(destinatario: destinatario) {
    console.log('campaña:', this.campanaSelected);
    console.log('rut:', destinatario.rut);
    const confirmacion = confirm(`¿Está seguro de que desea eliminar 
      "${destinatario.nombre} ${destinatario.snombre} ${destinatario.appaterno} ${destinatario.apmaterno} - RUT: ${this.formatRut(destinatario.rut)}-${destinatario.dvrut} "?`);
    if (confirmacion){
      await this.serviceDif.getDetalleDifusion(this.campanaSelected).subscribe({
        next: (response) => {
          console.log("Detalle difusion: "+JSON.stringify(response, null, 2));
          response.forEach((difusion : any) => {
            if(difusion.rut === destinatario.rut){
              const idDifusion = difusion.id_difusion
              console.log("Id difusion: "+idDifusion)
              this.serviceEnv.borrarEnv(idDifusion).subscribe({
                next: (response) => {
                  console.log('envio con id difusion '+idDifusion+' eliminado con éxito', response);
                },
                error: (error) => {
                  console.log('error al eliminar envío de la difusión', error);
                }
              });
            }
          })          
        },
        error: (error) => {
          console.log('error al eliminar envío de la difusión', error);
        }
      })
      await this.serviceDif.borrarDif(this.campanaSelected, destinatario.rut).subscribe({
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
    this.serviceDif.getDestinatariosCampana(idCampana).subscribe({
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
