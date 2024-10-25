import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) { }

  // Funciones de navegación
  irDestinatarios() {
    this.router.navigate(['/destinatarios']);  // Navega a la página de destinatarios
  }

  irDifusion() {
    this.router.navigate(['/difusion']);  // Navega a la página de listas de difusión
  }

  irCampanas() {
    this.router.navigate(['/campanas']);  // Navega a la página de campañas
  }

  irEmail() {
    this.router.navigate(['/email']);  // Navega a la página de envíos de correos
  }

  irSMS() {
    this.router.navigate(['/sms']);  // Navega a la página de envíos de SMS
  }

  irReportes() {
    this.router.navigate(['/reportes']);  // Navega a la página de reportes de campañas
  }

}
