import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceCamapanaService } from '../../services/service-campana/service-camapana.service';
import { campana } from '../../interfaces/campana.interface';
import { CommonModule } from '@angular/common';
import { ServiceDestinatarioService } from '../../services/service-destinatario/service-destinatario';
import { destinatario } from '../../interfaces/destinatario.interface';
import { ServiceDifusionService } from '../../services/service-difusion/service-difusion.service';
import { detalleDifusion, difusion } from '../../interfaces/difusion.interface';
import { ServiceEnvioService } from '../../services/service-envio/service-envio.service';
import { email } from '../../interfaces/email.interface';
import { envio } from '../../interfaces/envio';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

  campanaId: number = 0;

  campana: campana = {
    id_campana: 0,
    nombre: '',
    fecha_creacion: new Date(),
    fecha_programada: new Date(),
    hora_programada: new Date(),
    id_tipo_campana: 0,
    id_estado: 0,
  };

  destinatario: destinatario = {
    rut: '',
    dvrut: '',
    nombre: '',
    snombre: '',
    appaterno: '',
    apmaterno: '',
    email: '',
    telefono: ''
  };

  listDest : destinatario[] = []; //Almacenar los destinatarios de la campaña
  listDif : detalleDifusion[] = []; //Almacenar las difusiones de la campaña
  listEnv : envio[] = []; //Almacenar los envios de la campaña

  campanaHora: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private serviceCam : ServiceCamapanaService,
    private serviceDest: ServiceDestinatarioService,
    private serviceDif: ServiceDifusionService,
    private serviceEnv: ServiceEnvioService
  ) {
    this.route.queryParams.subscribe(params => {
      const campanaId = params['campanaId'];
      this.campanaId = Number(campanaId);
    });
  }

  ngOnInit(): void {
    this.mostrarCampana(this.campanaId);
    this.obtenerDifusiones();
  }

  formatRut(rut: string): string {
    if (!rut) return '';
    const formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedRut;
  }

  mostrarCampana(campanaId: number){
    this.serviceCam.getCam().subscribe(
      (response: campana[]) => {
        response.forEach((campana) => {
          if(campana.id_campana == campanaId){
            this.campanaHora = campana.hora_programada.toString().slice(0, -3); 
            this.campana = campana;
          }
        });
      },
    )
  }

  obtenerDifusiones(){
    console.log("se entró a obtener difusiones");  
    this.serviceDif.getDetalleDifusion(this.campanaId).subscribe(
      (response: detalleDifusion[]) => {
        console.log("response obtener difusion: "+JSON.stringify(response))
        this.listDif = response;
        response.forEach((difusion) => {
          
          this.obtenerDestinatarios(difusion.rut);
          if(difusion.id_difusion){
            this.obtenerEnvios(difusion.id_difusion);
          }  
          
          console.log("Lista difusion: "+ JSON.stringify(this.listDif));
          console.log("Lista destinatarios: "+ JSON.stringify(this.listDest));
          console.log("Lista envios: "+ JSON.stringify(this.listEnv));
        });        
      },
    )
  }

  obtenerDestinatarios(rut_difusion : string){
    this.serviceDest.getDest().subscribe(
      (response: destinatario[]) => {
        response.forEach((destinatario) => {
          if(destinatario.rut == rut_difusion){
            this.listDest.push(destinatario);
          }
        });
      },
    )
  }

  obtenerEnvios(id_difusion : number){
    this.serviceEnv.getEnv(this.campanaId).subscribe(
      (response: envio[]) => {
        response.forEach((envio) => {
          if(envio.id_difusion == id_difusion){
            this.listEnv.push(envio);
          }
        });
      },
    )
  }



}
