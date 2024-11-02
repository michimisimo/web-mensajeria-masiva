import { Component, ElementRef, ViewChild } from '@angular/core';
import { campana } from '../../interfaces/campana.interface';
import { destinatario } from '../../interfaces/destinatario.interface';
import { CommonModule } from '@angular/common';
import { ServiceCamapanaService } from '../../services/service-campana/service-camapana.service';
import { FormsModule } from '@angular/forms';
import { EditCampanaComponent } from '../../modal/edit-campana/edit-campana.component';
import { CreateCampanaComponent } from '../../modal/create-campana/create-campana.component';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';
import { ShowListComponent } from '../../modal/show-list/show-list.component';
import { email } from '../../interfaces/email.interface';



@Component({
  selector: 'app-campanas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EditCampanaComponent,
    CreateCampanaComponent,
    ShowListComponent,
  ],
  templateUrl: './campanas.component.html',
  styleUrl: './campanas.component.css',
})
export class CampanasComponent {
  constructor(
    private serviceCam: ServiceCamapanaService,
    private serviceDif: ServiceDifusionService
  ) {}

  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('cont') cont!: ElementRef;
  @ViewChild('cont1') cont1!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  ngOnInit(): void {
    this.mostrarCam(); // Llamar al método para cargar los datos al iniciar
  }

  newCampana: campana = {
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 3,
  };

  listCam: campana[] = [];
  listCamInProgress: campana[] = [];
  listCamTerminada: campana[] = [];

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
    id_estado: 0,
  };

  formattedCampana: campana = {
    id_campana: 0,
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 0,
  };

  listDest: destinatario[] = [];

  //Modal mostrar detalle campaña
  isDestinatariosModalOpen: boolean = false;
  idCampanaSelected: number = 0;
  nombreCampanaSelected: string = '';

  mostrarCam() {
    this.listCam = [];
    this.serviceCam.getCam().subscribe(
      (response: campana[]) => {
        response.forEach((campana) => {
          if (campana.id_estado != 4) {
            if (campana.id_estado == 3) {
              this.listCam.push(campana);
            } else if (campana.id_estado == 2) {
              this.listCamInProgress.push(campana);
            } else if (campana.id_estado == 1) {
              this.listCamTerminada.push(campana);
            }
          }
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    console.log('lista BD:', this.listCam);
  }

  formatCampana(campana: campana) {
    this.formattedCampana.id_campana = campana.id_campana;
    this.formattedCampana.nombre = campana.nombre;
    this.formattedCampana.fecha_creacion = campana.fecha_creacion;
    this.formattedCampana.fecha_programada = campana.fecha_programada;
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
    this.clearCampana(this.newCampana);
    this.isCreateModalOpen = false;
  }

  clearCampana(campana: campana) {
    campana.id_campana = 0;
    campana.nombre = '';
    campana.fecha_creacion = new Date();
    campana.fecha_programada = new Date();
    campana.id_tipo_campana = 0;
    campana.id_estado = 0;
  }

  createCampana(data: { campana: campana; email: email } | null) {
    if (data && data.campana) {
      // Convertir el nombre de la campaña a mayúsculas
      data.campana.nombre = data.campana.nombre.toUpperCase();

      // Crear la campaña
      this.serviceCam.crearCampana(data.campana).subscribe(
        (response) => {
          console.log('Campaña creada con éxito:', response);

          //Obtener el Id de la campaña recién creada
          this.serviceCam.getCam().subscribe(
            (response: campana[]) => {
              if (response.length > 0) {
                const idTipoCamp = response[0].id_tipo_campana; // Obtener la última campaña
                console.log("ID tipo campaña recién creada: "+idTipoCamp)

                //Si el tipo de campaña es Email, se crea el mensaje del email en la tabla Email
                if (idTipoCamp===2){
                  // Asignar el ID de campaña al objeto email
                  console.log("La campaña es Email con la siguiente ID tipo camp: "+idTipoCamp)
                  data.email.correo_remitente = "send@massive.com"
                  data.email.id_campana = 2;

                  console.log("Objeto Email antes de ser enviado para ser creaedo: "+data.email)

                  // Crear el email (mensaje) en la base de datos con todos sus atributos, excepto "email.destinatario"
                  this.serviceCam.crearEmailCampana(data.email).subscribe(
                    (emailResponse) => {
                      console.log('Email creado con éxito:', emailResponse);
                      this.mostrarCam(); // Actualiza la lista de campañas
                    },
                    (error) => {
                      console.error('Error al crear email:', error);
                    }
                  );
                } else {
                  this.mostrarCam();
                }        
              } else {
                console.log('No hay campañas disponibles.');
              }
            },
            (error) => {
              console.error('Error al obtener campañas:', error);
            }
          );

            

          this.isCreateModalOpen = false;
        },
        (error) => {
          console.error('Error al crear campaña:', error);
        }
      );
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
    if (campana) {
      campana = this.formatCampana(campana);
      campana.nombre = campana.nombre.toUpperCase();
      this.serviceCam.editarCampana(campana).subscribe(
        (response) => {
          console.log('Campaña editada con éxito:', response);
          this.mostrarCam(); // Actualiza la lista de campañas
        },
        (error) => {
          console.error('Error al editar campaña:', error);
        }
      );
      this.isEditModalOpen = false;
    }
  }

  eliminarCampana(campana: campana) {
    if (campana) {
      campana = this.formatCampana(campana);
      const confirmacion = confirm(
        `¿Está seguro de que desea eliminar la campaña "${campana.nombre}"?`
      );
      if (confirmacion) {
        campana.id_estado = 4;
        campana.nombre = campana.nombre.toUpperCase(); //Guardar nombre de campaña en mayúsculas
        this.serviceCam.editarCampana(campana).subscribe(
          (response) => {
            console.log('Campaña eliminada con éxito:', response);
            this.mostrarCam(); // Actualiza la lista de campañas
          },
          (error) => {
            console.error('Error al editar campaña:', error);
          }
        );
      }
    }
  }

  // Modal mostrar detalle campaña
  async selDataDif(campana: campana) {
    if (campana.id_campana) {
      this.idCampanaSelected = campana.id_campana;
      this.nombreCampanaSelected = campana.nombre;
      await this.getListDest(campana.id_campana);
      this.isDestinatariosModalOpen = true; // Abre el modal
    }
  }

  closeDestinatariosModal() {
    this.clearCampana(this.selectedCampana);
    this.isDestinatariosModalOpen = false; //Cierra el modal
  }

  getListDest(idCampana: number) {
    //Obtiene lista de destinatarios de la campaña
    this.serviceDif.getDetalleDifusion(idCampana).subscribe({
      next: (response) => {
        this.listDest = response || [];
        console.log('listDest', this.listDest);
      },
      error: (error) => {
        console.log('error al obtener detalle de difusión', error);
      },
    });
  }
}
