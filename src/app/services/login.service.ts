import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginClickSource = new Subject<void>();

    loginClick$ = this.loginClickSource.asObservable();

    emitLoginClick() {
        this.loginClickSource.next();
    }
}
