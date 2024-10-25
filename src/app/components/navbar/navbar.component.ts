import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Importar desde la carpeta 'services'


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], // Importa RouterLink si usas enlaces
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrige "styleUrl" a "styleUrls"
})
export class NavbarComponent {

  constructor(private loginService: LoginService) { }

  onLoginClick() {
    this.loginService.emitLoginClick();
  }

}