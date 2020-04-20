import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './../login-form/login-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from '../seguranca-routing.module';

import { SharedModule } from './../../shared/shared.module';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions, HttpModule } from '@angular/http';

export function authHttServiceFactory(http: Http, options: RequestOptions){
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    SegurancaRoutingModule,
    SharedModule,
    HttpModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  exports: []
})
export class SegurancaModule { }
