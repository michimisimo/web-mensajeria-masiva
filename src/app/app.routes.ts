import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DifusionComponent } from './difusion/difusion.component';
import { DestinatariosComponent } from './destinatarios/destinatarios.component';
import { CampanasComponent } from './campanas/campanas.component';
import { EmailComponent } from './email/email.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SmsComponent } from './sms/sms.component';


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