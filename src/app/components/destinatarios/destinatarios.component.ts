import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceDestinatarioService } from '../../services/service-destinatario/service-destinatario';
import { destinatario } from '../../interfaces/destinatario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private serviceDest: ServiceDestinatarioService) { }

  ngOnInit(): void {
    this.mostrarDest(); // Llama al método para cargar los datos al iniciar
  }

  listDest: destinatario[] = [];
  listDestProv: destinatario[] = [];

  convertir() {
    const file = this.fileInput.nativeElement.files[0]; // Obtener el archivo del input
    if (file) {
      this.serviceDest.uploadFile(file).subscribe(
        (response: destinatario[]) => {
          console.log('respuesta api:', response);
          response.forEach((item) => {
            console.log('item:', item)
            // Verificar que todos los campos requeridos están presentes
            if (item.rut &&
              item.dvrut &&
              item.nombre &&
              item.snombre &&
              item.appaterno &&
              item.apmaterno &&
              item.email &&
              item.telefono) {
              // Añadir a la lista
              this.listDestProv.push(item);
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

  mostrarDest() {
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

  // Método para enviar solo los destinatarios que no están en listDest
  subirDestinatarios(): void {
    // Filtrar los destinatarios que no están en listDest
    const nuevosDestinatarios = this.listDestProv.filter(destProv => {
      return !this.listDest.some(dest => dest.rut === destProv.rut);
    });

    // Subir los destinatarios no duplicados
    nuevosDestinatarios.forEach((destinatario) => {
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


  limpiarFileInput() {
    this.fileInput.nativeElement.value = '';
  }

  reset() {
    this.listDestProv = this.listDestProv.filter(item => {
      return this.listDest.includes(item); // Mantiene solo los elementos que están en listDest
    });
  }

}
