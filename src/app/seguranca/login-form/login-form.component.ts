import { NgForm } from '@angular/forms';
import { Login } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  login: Login = new Login();

  constructor() { }

  ngOnInit(): void {
  }

  logar(form: NgForm){
    console.log(`Testando login: ${form.value}`);

  }
}
