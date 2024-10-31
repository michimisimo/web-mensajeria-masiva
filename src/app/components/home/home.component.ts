import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrección: 'styleUrl' debe ser 'styleUrls'
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  private loginClickSubscription!: Subscription;

  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('registro') registro!: ElementRef;
  @ViewChild('volver') volver!: ElementRef;
  @ViewChild('cont') cont!: ElementRef;
  @ViewChild('cont1') cont1!: ElementRef;


  constructor(private loginService: LoginService, private router : Router) {
    // Suscribirse al servicio de login para abrir el popup
    this.loginClickSubscription = this.loginService.loginClick$.subscribe(() => {
      this.openPopup();
      this.openRegistro();
      this.volverLogin();
    });
  }

  ngAfterViewInit() {
    if (this.popup && this.closeBtn) {
      this.closeBtn.nativeElement.addEventListener('click', () => {
        this.popup.nativeElement.style.display = 'none';
      });
    } else {
      console.error('Los elementos no fueron encontrados');
    }
  }

  openPopup() {
    if (this.popup) {
      this.popup.nativeElement.style.display = 'flex';
    }
  }

  openRegistro() {
    if (this.registro && this.cont && this.cont1) {
      this.registro.nativeElement.addEventListener('click', () => {
        this.cont.nativeElement.style.display = 'none';
        this.cont1.nativeElement.style.display = 'flex';
      })
    } else {
      console.log("no se encontro #registro ni #cont1")
    }
  };

  volverLogin() {
    if (this.volver && this.cont && this.cont1) {
      this.volver.nativeElement.addEventListener('click', () => {
        this.cont.nativeElement.style.display = 'flex';
        this.cont1.nativeElement.style.display = 'none';
      })
    } else {
      console.log("no se encontro #volver ni #cont1")
    }
  };

  ngOnDestroy() {
    if (this.loginClickSubscription) {
      this.loginClickSubscription.unsubscribe();
    }
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}