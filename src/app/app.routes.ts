import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DestinatariosComponent } from './components/destinatarios/destinatarios.component';
import { CampanasComponent } from './components/campanas/campanas.component';
import { ReportesComponent } from './components/reportes/reportes.component';


export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'destinatarios', component: DestinatariosComponent },
    { path: 'campanas', component: CampanasComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección inicial
    { path: '**', redirectTo: '/home' } // Redirige rutas no encontradas
];