import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Http, RequestOptions} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './auth.guard';

export function authHttServiceFactory(auth: AuthService, errorHandler: ErrorHandlerService, http: Http, options: RequestOptions){
  const config = new AuthConfig({
    globalHeaders: [
      {'Content-Type': 'application/json'}
    ]
  });
  return new MoneyHttp(auth, errorHandler, config, http, options);
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttServiceFactory,
      deps: [AuthService, ErrorHandlerService, Http, RequestOptions, ]
    },
    AuthGuard
  ],
  exports: []
})
export class SegurancaModule { }
