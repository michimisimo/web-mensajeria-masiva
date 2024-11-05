import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, SidebarComponent], // Añade CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrige "styleUrl" a "styleUrls"
})
export class AppComponent {

  title = 'proyecto_arq';
  showSidebar = false;

  constructor(private router: Router) {
    // Suscripción a los eventos del router
    this.router.events.subscribe(event => {
      // Filtrar solo los eventos NavigationEnd
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('?')[0];  // Obtener solo la ruta base (sin parámetros)
        
        // Rutas donde se debe mostrar el sidebar
        const rutasConSidebar = ['/dashboard', '/campanas', '/destinatarios', '/reportes'];
        
        // Si la ruta está en las rutas con sidebar, mostrar el sidebar
        this.showSidebar = rutasConSidebar.includes(currentRoute);
      }
    });
  }
}
