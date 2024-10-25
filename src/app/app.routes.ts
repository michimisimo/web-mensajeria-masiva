import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DifusionComponent } from './components/lista-difusion/lista-difusion.component';
import { DestinatariosComponent } from './components/destinatarios/destinatarios.component';
import { CampanasComponent } from './components/campanas/campanas.component';
import { EmailComponent } from './components/email/email.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SmsComponent } from './components/sms/sms.component';


export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'difusion', component: DifusionComponent },
    { path: 'destinatarios', component: DestinatariosComponent },
    { path: 'campanas', component: CampanasComponent },
    { path: 'email', component: EmailComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'sms', component: SmsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección inicial
    { path: '**', redirectTo: '/home' } // Redirige rutas no encontradas
];