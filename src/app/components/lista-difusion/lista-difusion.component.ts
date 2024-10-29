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
  campanaId: number = 0;

  ngAfterViewInit(): void {
    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.popup.nativeElement.style.display = 'none';
    });
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
      next: (Response) => {
        this.listDest = Response || []
        console.log('listDest', Response)
      }, error(error) {
        console.log('error al obtener detalle difusion', error)
      }
    })
  }

  /*   selectedDestinatarios: { rut: string; campanaId: number }[] = [];
  
    onSelect(rut: string, event: Event) {
      const isChecked = (event.target as HTMLInputElement).checked;
      if (isChecked) {
        // Agregar a la lista de seleccionados
        this.selectedDestinatarios.push({ rut, this.camapanaId });
      } else {
        // Eliminar de la lista de seleccionados
        this.selectedDestinatarios = this.selectedDestinatarios.filter(d => d.rut !== rut);
      }
      console.log('Destinatarios seleccionados:', this.selectedDestinatarios);
    } */


}