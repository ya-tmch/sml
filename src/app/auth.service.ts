import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FacebookService, InitParams, LoginResponse, LoginStatus} from 'ngx-facebook';

@Injectable()
export class AuthService {
    private user: User = null;

    constructor(
        private fb: FacebookService,
    ) {
        fb
            .init(<InitParams> {
                appId: environment.fb.app_id, xfbml: true, version: environment.fb.api_v
            })
            .catch((err: any) => console.error(err));
    }

    public isAuth(): boolean {
        return this.user !== null;
    }

    public logout(): Promise<any> {
        return this.fb.logout().then(() => this.user = null);
    }

    public getUser(): User {
        return this.user;
    }

    public getLoginStatus(): Promise<void> {
        return this.fb
            .getLoginStatus()
            .then((response: LoginStatus) => this.handleLoginResponse(response));
    }

    public login(): Promise<any> {
        return this.fb
            .login({scope: 'public_profile,email'})
            .then((response: LoginResponse) => this.handleLoginResponse(response));
    }

    private handleLoginResponse(response: LoginResponse|LoginStatus) {
        switch (response.status) {
            case 'connected':
                return this.fb
                    .api(`/${response.authResponse.userID}?fields=id,name,picture`)
                    .then((profile: any) => {
                        this.user = <User> {
                            id: profile.id,
                            name: profile.name,
                            photo: profile.picture.data.url
                        };
                    })

            default:
                return Promise.resolve();
        }
    }
}

export class User {
    public id: number;
    public name: string;
    public photo: string;
}

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuth()) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}