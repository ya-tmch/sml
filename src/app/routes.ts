import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';
import {MyAnswerComponent} from './components/my-answer/my-answer.component';
import {AllAnswersComponent} from './components/all-answers/all-answers.component';
import {CanActivateAuthGuard} from './auth.service';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [CanActivateAuthGuard],
        children: [
            {path: 'my-answer', component: MyAnswerComponent},
            {path: 'all-answers', component: AllAnswersComponent},
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '/login', pathMatch: 'full'},
]
