import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  genderList = ['M', 'F', 'U'];

  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      gender: [''],
      avatar: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$'), Validators.minLength(6)]],
      role: 'user',
    })
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signup", this.signupForm.value)
    .subscribe(result => {
      if (result.email && result.gender 
        && result.name && result.password) {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    })
  }
}
