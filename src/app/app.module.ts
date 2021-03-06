import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { SitesComponent } from './sites/sites.component';
import { CreateComponent } from './sites/create/create.component';
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './services/auth-intercepter';
import { ErrorInterceptor } from './services/error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { EditComponent } from './sites/edit/edit.component';
import { TestsComponent } from './sites/tests/tests.component';
import { EntranceComponent } from './entrance/entrance.component';
import { EditTestComponent } from './sites/tests/edit/edit.component';
import { LogsComponent } from './sites/tests/logs/logs.component';






@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SitesComponent,
    CreateComponent,
    UsersComponent,
    UserCreateComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    EditComponent,
    TestsComponent,
    EntranceComponent,
    EditTestComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
