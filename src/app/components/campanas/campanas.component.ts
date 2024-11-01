import { Component, ElementRef, ViewChild } from '@angular/core';
import { campana } from '../../interfaces/campana.interface';
import { CommonModule } from '@angular/common';
import { ServiceCamapanaService } from '../../services/service-campana/service-camapana.service';
import { FormsModule } from '@angular/forms';
import { EditCampanaComponent } from '../../modal/edit-campana/edit-campana.component';
import { CreateCampanaComponent } from '../../modal/create-campana/create-campana.component';


@Component({
  selector: 'app-campanas',
  standalone: true,
  imports: [CommonModule, FormsModule, EditCampanaComponent, CreateCampanaComponent],
  templateUrl: './campanas.component.html',
  styleUrl: './campanas.component.css'
})
export class CampanasComponent {

  constructor(private serviceCam: ServiceCamapanaService) {}

  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('cont') cont!: ElementRef;
  @ViewChild('cont1') cont1!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  ngOnInit(): void {
    this.mostrarCam(); // Llamar al método para cargar los datos al iniciar
  }
  mostrarCampana: campana = {
    id_campana: 0,
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 0
  };

  nombreTipoCampana: string = '';

  newCampana: campana = {
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 3
  };

  listCam: campana[] = [];
  listCamProv: campana[] = [];

  //Modal crear campaña
  isCreateModalOpen = false;

  //Modal editar campaña
  isEditModalOpen = false;
  selectedCampana: campana = {
    id_campana: 0,
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 0
  };

  formattedCampana : campana = {
    id_campana: 0,
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 0
  };

  mostrarCam() {
    this.listCam = [];
    this.serviceCam.getCam().subscribe(
      (response: campana[]) => {
        response.forEach((campana) => {
          if(campana.id_estado != 4){
            this.mostrarCampana = campana
          this.nombreTipoCampana = this.getTipoCampanaNombre(this.mostrarCampana.id_tipo_campana);
          this.listCam.push(this.mostrarCampana);
          }          
        });   
      },
       error => {
        console.error('Error:', error)
      }
    )
    console.log('lista BD:', this.listCam)
  }

  getTipoCampanaNombre(id: number) {
    let nombreTipoCampana = '';
    if (id === 1) {
      nombreTipoCampana = 'SMS';
    } else if (id === 2) {
      nombreTipoCampana = 'EMAIL';
    } else{
      console.log("No se pudo obtener el nombre del tipo de campaña")
      return "-";
    }
    return nombreTipoCampana;
  }

  formatCampana(campana: campana){
    this.formattedCampana.id_campana= campana.id_campana;
    this.formattedCampana.nombre = campana.nombre;
    this.formattedCampana.fecha_creacion = campana.fecha_creacion;
    this.formattedCampana.fecha_programada = campana. fecha_programada;
    this.formattedCampana.hora_programada = campana.hora_programada;
    this.formattedCampana.id_tipo_campana = campana.id_tipo_campana;
    this.formattedCampana.id_estado = campana.id_estado;
    return this.formattedCampana;
  }
  
  //Modal crear campaña
  openCreateModal() {    
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.clearCampaña(this.newCampana);
    this.isCreateModalOpen = false;
  }

  clearCampaña(campana : campana){
    campana.id_campana =  0;
    campana.nombre = '';
    campana.fecha_creacion = new Date();
    campana.fecha_programada = new Date();
    campana.id_tipo_campana = 0;
    campana.id_estado = 0;
  };


  createCampana(campana: campana | null) {    
    if (campana){
      campana.nombre = campana.nombre.toUpperCase();
      this.serviceCam.crearCampana(campana).subscribe(
        response => {
          console.log('Campaña creada con éxito:', response);

          this.mostrarCam(); // Actualiza la lista de campañas
        },
        error => {
          console.error('Error al crear campaña:', error);
        }
      );
    this.isCreateModalOpen = false;
    }    
  }

  //Modal editar campaña
  openEditModal(campana: campana) {
    this.selectedCampana = { ...campana }; //clona la campaña
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  editarCampana(campana: campana | null) {    
    if (campana){
      campana = this.formatCampana(campana);
      campana.nombre = campana.nombre.toUpperCase();
      this.serviceCam.editarCampana(campana).subscribe(
        response => {
          console.log('Campaña editada con éxito:', response);
          this.mostrarCam(); // Actualiza la lista de campañas
        },
        error => {
          console.error('Error al editar campaña:', error);
        }
      );
    this.isEditModalOpen = false;
    }    
  }  

  eliminarCampana(campana: campana) {
    if (campana) {
      campana = this.formatCampana(campana);
      const confirmacion = confirm(`¿Está seguro de que desea eliminar la campaña "${campana.nombre}"?`);
      if (confirmacion) {
        campana.id_estado = 4;
        campana.nombre = campana.nombre.toUpperCase(); //Guardar nombre de campaña en mayúsculas
        this.serviceCam.editarCampana(campana).subscribe(
          response => {
            console.log('Campaña eliminada con éxito:', response);
            this.mostrarCam(); // Actualiza la lista de campañas
          },
          error => {
            console.error('Error al editar campaña:', error);
          }
        );
      }
    }
  }


}
