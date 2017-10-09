import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public wait = false;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        this.wait = true;

        this.auth
            .getLoginStatus()
            .then(() => this.auth.isAuth() && this.toMain())
            .catch((err: any) => console.error(err))
            .then(() => this.wait = false);
    }

    public login() {
        this.wait = true;

        this.auth
            .login()
            .then(() => this.auth.isAuth() && this.toMain())
            .catch((err: any) => console.error(err))
            .then(() => this.wait = false);
    }

    private toMain(): void {
        this.router.navigate(['', 'my-answer']);
    }
}
