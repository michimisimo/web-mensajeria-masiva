import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceDestinatarioService } from '../../services/service-destinatario/service-destinatario';
import { destinatario} from '../../interfaces/destinatario.interface';
import { CommonModule } from '@angular/common';
import {url_plantilla} from '../../utils/urls'
import { EditDestinatarioComponent } from '../../modal/edit-destinatario/edit-destinatario.component';

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [CommonModule, EditDestinatarioComponent],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css'],
})
export class DestinatariosComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private serviceDest: ServiceDestinatarioService) { }

  ngOnInit(): void {
    this.mostrarDest(); // Llama al método para cargar los datos al iniciar
  }

  listDest: destinatario[] = [];
  listDestProv: destinatario[] = [];

  //Modal de edición de destinatario
  selectedDestinatario: destinatario | null = null; // Para almacenar el destinatario seleccionado para editar
  isModalOpen = false;

  convertir() {
    const file = this.fileInput.nativeElement.files[0]; // Obtener el archivo del input
    if (file) {
      this.serviceDest.uploadFile(file).subscribe(
        (response: destinatario[]) => {
          console.log('respuesta service:', response);
          response.forEach((item) => {
            console.log('item:', item)
            // Verificar que todos los campos requeridos están presentes
            if (item.rut &&
              item.nombre &&
              item.snombre &&
              item.appaterno &&
              item.apmaterno &&
              item.email &&
              item.telefono) {    
              //Separar dv 
              item.dvrut = item.rut[item.rut.length-1];     
              item.rut = item.rut.slice(0,-1);
              // Añadir a la lista  
              const exists = this.listDestProv.some(dest => dest.rut === item.rut);
              if (!exists) {
                  this.listDestProv.push(item);
              }   
            } else {
              console.error('el contenido del archivo no es admisible para el modelo de datos')
            }
          });
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
    console.log('lista_BD:', this.listDest)
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

  darFormatoUpper(destinatario : destinatario){    
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
  //Abrir el modal para editar
  openEditDest(destinatario: destinatario) {
    this.selectedDestinatario = { ...destinatario }; // Clona el destinatario
    this.isModalOpen = true; // Abre el modal
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

}
