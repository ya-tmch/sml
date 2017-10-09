import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
    providers: [],
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

    constructor(
        private router: Router,
        private auth: AuthService
    ) {}

    public logout(): void {
        this
            .auth
            .logout()
            .then(() => this.router.navigate(['login']))
            .catch((err: any) => console.error(err));
    }
}
