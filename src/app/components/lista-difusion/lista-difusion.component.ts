import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { difusion } from '../../interfaces/difusion.interface';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';
import { destinatario } from '../../interfaces/destinatario.interface';

@Component({
  selector: 'app-difusion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-difusion.component.html',
  styleUrls: ['./lista-difusion.component.css']
})
export class DifusionComponent {

  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(private serviceDif: ServiceDifusionService,) { }
  ngOnInit(): void {
    this.mostrarDif();
  }

  listDif: difusion[] = [];
  listDest: destinatario[] = [];
  campanaSelected: number = 0;

  ngAfterViewInit(): void {
    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.popup.nativeElement.style.display = 'none';
    });
  }

  formatRut(rut: string): string {
    if (!rut) return '';
    const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedRut;
  }

  mostrarDif() {
    this.serviceDif.getDifusion().subscribe({
      next: (Response) => {
        this.listDif = (Response || [])
        console.log('listDif:', this.listDif)
      }, error: (error) => {
        console.log('error al obtener difusion', error)
      }
    })
  };

  async selDataDif(idCampana: number) {
    this.campanaSelected = idCampana;
    console.log(idCampana)
    await this.mostrarDetDif(idCampana);
    this.openPopUp();
  }

  openPopUp() {
    this.popup.nativeElement.style.display = 'flex';
  }

  closePopUp() {
    this.popup.nativeElement.style.display = 'none';
  }

  mostrarDetDif(idCampana: number) {
    this.serviceDif.getDetalleDifusion(idCampana).subscribe({
      next: (response) => {
        this.listDest = response || [];
        console.log('listDest', this.listDest);

        // Verifica la longitud después de actualizar
        if (this.listDest.length === 0) {
          this.campanaSelected = 0; // Reinicia la selección si no hay destinatarios
          this.closePopUp(); // Cierra el popup
          this.mostrarDif(); // Muestra la lista de difusiones
        }
      },
      error: (error) => {
        console.log('error al obtener detalle de difusión', error);
      }
    });
  }

  eliminarDestinatario(rut: string) {
    console.log('campaña:', this.campanaSelected);
    console.log('rut:', rut);

    this.serviceDif.borrarDif(this.campanaSelected, rut).subscribe({
      next: (response) => {
        console.log('destinatario eliminado de la difusión con éxito', response);

        // Esperar a que se actualice la lista de destinatarios
        this.mostrarDetDif(this.campanaSelected);
      },
      error: (error) => {
        console.log('error al eliminar destinatario de la difusión', error);
      }
    });
  }

}