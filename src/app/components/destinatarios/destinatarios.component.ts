import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceDestinatarioService } from '../../services/service-destinatario/service-destinatario';
import { destinatario} from '../../interfaces/destinatario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [CommonModule],
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

formatRut(rut: string): string {
  if (!rut) return '';
  const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedRut;
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
      //Formatear texto
      destinatario.dvrut = destinatario.dvrut.toUpperCase();
      destinatario.nombre = destinatario.nombre.toUpperCase();
      destinatario.snombre = destinatario.snombre.toUpperCase();
      destinatario.appaterno = destinatario.appaterno.toUpperCase();
      destinatario.apmaterno = destinatario.apmaterno.toUpperCase();
      if(typeof destinatario.email == 'string'){
        destinatario.email = destinatario.email.toUpperCase();
      }      

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
    this.limpiarFileInput();
    this.listDestProv = this.listDestProv.filter(item => {
      return this.listDest.includes(item); // Mantiene solo los elementos que están en listDest
    });
  }

  descargarPlantilla() {
    const url = 'https://ffzsgvasphxakhjarmoj.supabase.co/storage/v1/object/public/plantilla/plantilla_destinatarios.xlsx';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plantilla_destinatarios.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
