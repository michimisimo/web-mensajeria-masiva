import { Component, ElementRef, ViewChild } from '@angular/core';
import { campana } from '../../interfaces/campana.interface';
import { CommonModule } from '@angular/common';
import { ServiceCamapanaService } from '../../services/service-campana/service-camapana.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-campanas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campanas.component.html',
  styleUrl: './campanas.component.css'
})
export class CampanasComponent {

  constructor(private serviceCam: ServiceCamapanaService) {
    this.selectedTipoCampana = this.tiposCampana[0].id;
  }

  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('cont') cont!: ElementRef;
  @ViewChild('cont1') cont1!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  ngOnInit(): void {
    this.mostrarCam(); // Llamar al método para cargar los datos al iniciar
  }

  ngAfterViewInit(): void {
    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.popup.nativeElement.style.display = 'none';
    });
  }

  selectedTipoCampana: number;

  tiposCampana = [
    { id: 1, nombre: 'SMS' },
    { id: 2, nombre: 'email' },
  ];
  listCam: campana[] = [];
  listCamProv: campana[] = [];

  mostrarCam() {
    this.serviceCam.getCam().subscribe(
      (response: campana[]) => {
        this.listCam = response;
        this.listCam.forEach(item => {
          this.listCamProv.push(item);
        });
      },
      error => {
        console.error('Error:', error)
      }
    )
    console.log('lista BD:', this.listCam)
  }

  openCrear() {
    this.popup.nativeElement.style.display = 'flex';
    this.cont1.nativeElement.style.display = 'none';
    this.cont.nativeElement.style.display = 'flex';
  }

  modificar() {
    this.popup.nativeElement.style.display = 'flex';
    this.cont.nativeElement.style.display = 'none';
    this.cont1.nativeElement.style.display = 'flex';
  }


}
