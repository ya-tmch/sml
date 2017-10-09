import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';

import {AuthService, CanActivateAuthGuard} from './auth.service';
import {StorageService} from './storage.service';

import {AppComponent} from './components/app/app.component';
import {LoginComponent} from './components/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';
import {MyAnswerComponent} from './components/my-answer/my-answer.component';
import {AllAnswersComponent} from './components/all-answers/all-answers.component';
import {FormsModule} from '@angular/forms';
import {AnswerComponent} from './components/all-answers/answer/answer.component';
import {DelAnswerModalComponent} from './components/all-answers/del-answer-modal/del-answer-modal.component';
import {FacebookService} from 'ngx-facebook';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        MyAnswerComponent,
        AllAnswersComponent,
        AnswerComponent,
        DelAnswerModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, {enableTracing: false})
    ],
    providers: [
        AuthService,
        FacebookService,
        CanActivateAuthGuard,
        StorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
