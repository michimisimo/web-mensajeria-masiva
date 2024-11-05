import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { reporte } from '../../interfaces/reporte';
import { ServiceEnvioService } from '../../services/service-envio/service-envio.service';
import { ServiceCamapanaService } from '../../services/service-campana/service-camapana.service';
import { campana } from '../../interfaces/campana.interface';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';
import { detalleDifusion, difusion } from '../../interfaces/difusion.interface';
import { envio } from '../../interfaces/envio';
import { destinatario } from '../../interfaces/destinatario.interface';
import { ServiceDestinatarioService } from '../../services/service-destinatario/service-destinatario';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

  campanaId: number = 0;

  reporte: reporte = {
    id: 0,
    id_campana: 0,
    nombre_campana: "",
    fecha_programada: "",
    hora_programada: "",
    fecha_envio: "",
    destinatarios_totales: 0,
    correos_enviados: 0,
    correos_fallidos: 0,
    contenido: "",
    asunto: "",
    remitente: "",
    lista_destinatarios: [],
    errores: []
  };

  campanas:campana[] = [];
  tipoCampana: number = 0;

  listaDif : detalleDifusion[] = [];
  listaEnv : envio[] = [];
  listaDest: destinatario[] = [];

  constructor(
    private route: ActivatedRoute,
    private serviceEnv: ServiceEnvioService,
    private serviceCam: ServiceCamapanaService,
    private serviceDif: ServiceDifusionService,
    private serviceDest:ServiceDestinatarioService
  ) {
    this.route.queryParams.subscribe(params => {
      const campanaId = params['campanaId'];
      this.campanaId = Number(campanaId);
    });
  }

  ngOnInit(): void {
    this.obtenerTipoCampana();
    this.obtenerDifusionesCampana();
    this.obtenerDestinatarios();
    this.obtenerReporteCampana();
  }

  formatRut(rut: string): string {
    if (!rut) return '';
    const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedRut;
  }

  obtenerReporteCampana(){
    this.serviceEnv.getReporte(this.campanaId).subscribe(reporteData => {
      if (reporteData.length > 0) {
          const data = reporteData[0];

          this.reporte.id = data.id;
          this.reporte.id_campana = data.id_campana;
          this.reporte.nombre_campana = data.nombre_campana;
          this.reporte.fecha_programada = data.fecha_programada;
          this.reporte.hora_programada = data.hora_programada;
          this.reporte.fecha_envio = data.fecha_envio;
          this.reporte.destinatarios_totales = data.destinatarios_totales;
          this.reporte.correos_enviados = data.correos_enviados;
          this.reporte.correos_fallidos = data.correos_fallidos;
          this.reporte.contenido = data.contenido;
          this.reporte.asunto = data.asunto;
          this.reporte.remitente = data.remitente;
          this.reporte.lista_destinatarios = JSON.parse(data.lista_destinatarios);
          this.reporte.errores = JSON.parse(data.errores);
      }
    }, error => {
        console.error('Error al obtener el reporte:', error);
    });    
  }

  obtenerDestinatarios() {
    this.serviceDest.getDest().subscribe(response => {
        console.log('Destinatarios response:', response); // Verifica la respuesta aquí
        if (Array.isArray(response)) {
            response.forEach(destinatario => {
                // Verifica si el email del destinatario está en la lista de destinatarios del reporte
                if (this.reporte.lista_destinatarios.includes(destinatario.email)) {
                    this.listaDest.push(destinatario);                 
                }
            });
        } else {
            console.error('La respuesta no es un arreglo:', response);
        }
    }, error => {
        console.error('Error al obtener las campañas:', error);
    });
  }

  obtenerTipoCampana(){
    this.serviceCam.getCam().subscribe(response => {
      if (Array.isArray(response)) {
          response.forEach(campana => {
              if (campana.id_campana === this.campanaId) {
                this.tipoCampana = campana.id_tipo_campana;                 
              }
          });
      } else {
          console.error('La respuesta no es un arreglo:', response);
      }
    }, error => {
        console.error('Error al obtener las campañas:', error);
    });
  }

  obtenerDifusionesCampana(){
    this.serviceDif.getDetalleDifusion(this.campanaId).subscribe(response => {
      if (Array.isArray(response)) {
          response.forEach(difusion => {
              if (difusion.id_campana === this.campanaId) {
                this.obtenerEnvioCampana(difusion.id_difusion);    
                this.listaDif.push(difusion);                           
              }
          });
      } else {
          console.error('La respuesta no es un arreglo:', response);
      }
    }, error => {
        console.error('Error al obtener las campañas:', error);
    });
  }

  obtenerEnvioCampana(id_difusion: number){
    this.serviceEnv.getEnv(this.campanaId).subscribe(response => {
      if (Array.isArray(response)) {
          response.forEach((envio:any) => {
              if (envio[0].id_difusion === id_difusion) {
                this.listaEnv.push(envio[0]);                
              }
          });
      } else {
          console.error('La respuesta no es un arreglo:', response);
      }
    }, error => {
        console.error('Error al obtener las campañas:', error);
    });
  }

  getEnvioDestinatario(rut: string) {
    // Obtener la difusion que corresponde al rut
    const difusion = this.listaDif.find(d => d.rut === rut);

    if (difusion) {
        // Obtener el envio correspondiente a la difusion
        const envio = this.listaEnv.find(e => e.id_difusion === difusion.id_difusion);
        return envio; // Retorna el objeto de envio o undefined si no se encuentra
    }

    return null; // Retorna null si no se encontró la difusion
}

  

}
