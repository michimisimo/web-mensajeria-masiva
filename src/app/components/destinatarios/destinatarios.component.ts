import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceDestinatarioService } from '../../services/service-destinatario/service-destinatario';
import { destinatario } from '../../interfaces/destinatario.interface';
import { CommonModule } from '@angular/common';
import { url_plantilla } from '../../utils/urls'
import { EditDestinatarioComponent } from '../../modal/edit-destinatario/edit-destinatario.component';
import { campana } from '../../interfaces/campana.interface';
import { ServiceCamapanaService } from '../../services/service-campana/service-camapana.service';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';
import { FormsModule } from '@angular/forms';
import { detalleDifusion } from '../../interfaces/difusion.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [CommonModule, EditDestinatarioComponent, FormsModule],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css'],
})
export class DestinatariosComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  ngAfterViewInit(): void {
    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.popup.nativeElement.style.display = 'none';
    });
  }

  constructor(private serviceDest: ServiceDestinatarioService,
    private serviceCam: ServiceCamapanaService,
    private serviceDif: ServiceDifusionService) { }

  ngOnInit(): void {
    this.mostrarDest(); // Llama al método para cargar los datos al iniciar
    this.mostrarCam();
  }

  selectedCampana: number = 0;
  listCam: campana[] = [];
  listDest: destinatario[] = [];
  listDestProv: destinatario[] = [];
  selectedRuts: string[] = [];

  //Modal de edición de destinatario
  selectedDestinatario: destinatario | null = null; // Para almacenar el destinatario seleccionado para editar
  isModalOpen = false;

  convertir() {
    const file = this.fileInput.nativeElement.files[0]; // Obtener el archivo del input
    if (file) {
      this.serviceDest.uploadFile(file).subscribe(
        (response: destinatario[]) => {
          console.log('respuesta service:', response);

          // Crear un conjunto de RUTs para facilitar la búsqueda
          const existingRutsInDestProv = new Set(this.listDestProv.map(dest => dest.rut));

          response.forEach((item) => {
            console.log('item:', item);
            // Verificar que todos los campos requeridos están presentes
            if (item.rut &&
              item.nombre &&
              item.snombre &&
              item.appaterno &&
              item.apmaterno &&
              item.email &&
              item.telefono) {
              // Separar dv 
              item.dvrut = item.rut[item.rut.length - 1];
              item.rut = item.rut.slice(0, -1);

              // Añadir a la lista si no existe
              if (!existingRutsInDestProv.has(item.rut)) {
                this.listDestProv.push(item);
              }
            } else {
              console.error('El contenido del archivo no es admisible para el modelo de datos');
            }
          });

          // Actualizar selectedRuts con los RUTs que han sido agregados desde el archivo
          this.selectedRuts = response
            .filter(item => this.listDestProv.some(dest => dest.rut === item.rut))
            .map(item => item.rut);

          this.limpiarFileInput();
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Por favor, selecciona un archivo.');
    }
  }

  formatRut(rut: string): string {
    if (!rut) return '';
    const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedRut;
  }

  mostrarDest() {
    this.listDestProv = [];
    this.serviceDest.getDest().subscribe(
      (response: destinatario[]) => {
        this.listDest = response; // Reemplaza la lista con los datos de la API
        this.listDest.forEach(item => {
          this.listDestProv.push(item)
        });
      },
      error => {
        console.error('Error:', error);
      }
    );
    /* console.log('lista_BD:', this.listDest) */
  }

  isDestinatarioAntiguo(rut: string): boolean {
    return this.listDest.some(antiguo => antiguo.rut === rut);
  }

  // Método para enviar solo los destinatarios que no están en listDest
  subirDestinatarios(): void {
    // Filtrar los destinatarios que no están en listDest
    const nuevosDestinatarios = this.listDestProv.filter(destProv => {
      return !this.listDest.some(dest => dest.rut === destProv.rut);
    });

    // Subir los destinatarios no duplicados
    nuevosDestinatarios.forEach((destinatario) => {
      this.darFormatoUpper(destinatario);

      this.serviceDest.subirDestinatario(destinatario).subscribe(
        (response) => {
          console.log('Destinatario subido con éxito:', response);
          this.listDest = [];
          this.reset();
          this.mostrarDest();
        },
        (error) => {
          console.error('Error al subir destinatario:', error);
        }
      );
    });
  }

  darFormatoUpper(destinatario: destinatario) {
    destinatario.dvrut = destinatario.dvrut.toUpperCase();
    destinatario.nombre = destinatario.nombre.toUpperCase();
    destinatario.snombre = destinatario.snombre.toUpperCase();
    destinatario.appaterno = destinatario.appaterno.toUpperCase();
    destinatario.apmaterno = destinatario.apmaterno.toUpperCase();
    destinatario.email = destinatario.email.toUpperCase();
  }

  limpiarFileInput() {
    this.fileInput.nativeElement.value = '';
  }

  reset() {
    this.limpiarFileInput();
    this.listDestProv = this.listDestProv.filter(item => {
      return this.listDest.includes(item); // Mantiene solo los elementos que están en listDest
    });
    this.selectedRuts = []; // Vaciar el array de RUTs seleccionados
  }

  descargarPlantilla() {
    const url = url_plantilla;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plantilla_destinatarios.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //Editar destinatario
  openEditDest(destinatario: destinatario) {
    //Abrir pop-up con mensaje para advertir que hay cambios sin guardar
    if (this.listDestProv.length !== this.listDest.length) {
      const confirmEdit = confirm("Guarda los cambios antes de editar.");
      if (!confirmEdit) {
        this.isModalOpen = false;
      }
    } else {
      //Abrir modal para editar
      this.selectedDestinatario = { ...destinatario }; // Clona el destinatario
      this.isModalOpen = true;
    }
  }

  //Guardar destinatario editado
  editarDestinatario(destinatario: destinatario | null) {
    if (destinatario) {
      this.darFormatoUpper(destinatario);
      this.serviceDest.editarDestinatario(destinatario).subscribe(
        response => {
          console.log('Destinatario editado con éxito:', response);
          this.mostrarDest(); // Actualiza la lista de destinatarios
        },
        error => {
          console.error('Error al editar destinatario:', error);
        }
      );
    }
    this.isModalOpen = false; // Cierra el modal
    this.selectedDestinatario = null; // Reinicia el destinatario seleccionado
  }

  //Guardar destinatario editado
  eliminarDestinatario(destinatario: destinatario) {
    if (destinatario) {
      const confirmacion = confirm(`Está seguro de que desea eliminar a ${destinatario.nombre} ${destinatario.appaterno}? Rut: ${destinatario.rut}-${destinatario.dvrut}`);
      if (confirmacion) {
        destinatario.activo = false;
        this.darFormatoUpper(destinatario);
        this.serviceDest.editarDestinatario(destinatario).subscribe(
          response => {
            console.log('Destinatario eliminado con éxito:', response);
            this.mostrarDest(); // Actualiza la lista de destinatarios
          },
          error => {
            console.error('Error al editar destinatario:', error);
          }
        );
      }
    }
  }

  //metodo para almacenar los users seleccionados
  // Al agregar o quitar RUTs, actualiza el objeto
  onCheckboxChange(event: any, rut: string) {
    if (event.target.checked) {
      this.selectedRuts.push(rut); // Agregar el RUT si está seleccionado
      console.log('selectedRuts', JSON.stringify(this.selectedRuts));
    } else {
      this.selectedRuts = this.selectedRuts.filter(item => item !== rut); // Quitar el RUT si no está seleccionado
      console.log('selectedRuts', JSON.stringify(this.selectedRuts));
    }
  }

  //Método para seleccionar todos los checkbox de la tabla
  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.selectedRuts = checked ? this.listDestProv.map(destinatario => destinatario.rut) : [];
  }

  cambioCampana(event: any) {
    console.log('idCam seleccionado:', this.selectedCampana);
  }

  crearDifusion() {
    if (this.selectedRuts.length !== 0 && this.selectedCampana !== 0) {
      this.filtrarDestDif(this.selectedCampana, this.selectedRuts).subscribe(filtrados => {
        if (filtrados.length > 0) {
          try {
            const rutsData = { ruts: filtrados };
            this.serviceDif.subirDifusion(this.selectedCampana, rutsData).subscribe(
              response => {
                console.log('Lista de difusión creada con éxito:', response);
                this.selectedCampana = 0;
                this.selectedRuts = []; // Vaciar el array de RUTs seleccionados
                this.popup.nativeElement.style.display = 'none';
              },
              error => {
                console.error('Error al crear la lista de difusión:', error);
              }
            );
          } catch (error) {
            console.log('Error al crear la lista de difusión:', error);
          }
        } else {
          console.log('No hay RUTs filtrados para crear la lista de difusión.');
          this.selectedCampana = 0;
          this.selectedRuts = []; // Vaciar el array de RUTs seleccionados
          this.popup.nativeElement.style.display = 'none';
        }
      });
    } else {
      console.log('Falta información para crear lista de difusión');
    }
  }

  mostrarCam() {
    this.serviceCam.getCam().subscribe(
      (response: campana[]) => {
        this.listCam = response
        /* console.log('Campañas cargadas:', this.listCam); */
      },
      error => {
        console.error('Error al cargar campañas:', error);
      }
    );
  };

  openCrear() {
    this.popup.nativeElement.style.display = 'flex';
  }

  filtrarDestDif(idCam: number, ruts: string[]): Observable<string[]> {
    return this.serviceDif.getDetalleDifusion(idCam).pipe(
      map((difusion: detalleDifusion[]) => {
        console.log('difusion', difusion);
        const filteredRuts = ruts.filter(rut => !difusion.some(d => d.rut === rut));
        console.log('RUTs filtrados:', filteredRuts);
        return filteredRuts; // Devuelve los RUTs filtrados
      }),
      catchError(error => {
        console.error('Error al obtener detalle de difusión:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }
}
