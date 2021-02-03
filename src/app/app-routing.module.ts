import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './services/auth.guard';
import { CreateComponent } from './sites/create/create.component';
import { EditComponent } from './sites/edit/edit.component';
import { EditTestComponent } from './sites/tests/edit/edit.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'sites/create', component: CreateComponent, canActivate:[AuthGuard]},
  { path: 'sites/edit/:id', component: EditComponent, canActivate:[AuthGuard]},

  { path: 'sites/:siteId/tests/:id', component: EditTestComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers:[
    AuthGuard
  ]
})
export class AppRoutingModule { }
