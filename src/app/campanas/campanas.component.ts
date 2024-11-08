import { Component, ElementRef, ViewChild } from '@angular/core';
import { campana } from '../interfaces/campana.interface';
import { CommonModule } from '@angular/common';
import { ApiGestCamapanaService } from '../api/api_gest_campana/api-gest-camapana.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-campanas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campanas.component.html',
  styleUrl: './campanas.component.css'
})
export class CampanasComponent {

  constructor(private apiCam: ApiGestCamapanaService) {
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
    this.apiCam.getCam().subscribe(
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

  selectedCampaign: any = null;

  // Método para seleccionar o deseleccionar la campaña
  toggleSelection(campaign: any) {
    if (this.selectedCampaign === campaign) {
      // Si la campaña ya está seleccionada, deseleccionarla
      this.selectedCampaign = null;
    } else {
      // De lo contrario, seleccionar la campaña
      this.selectedCampaign = campaign;
    }
    console.log('Campaña seleccionada:', this.selectedCampaign);
  }

  // Método para saber si una campaña está seleccionada
  isSelected(campaign: any): boolean {
    return this.selectedCampaign === campaign;
  }


}
