import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;
  isRemember: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  updateIsRemember() {
    this.isRemember = !this.isRemember;
  }

  login() {
    return this.authService.login(this.loginForm);
  }
}