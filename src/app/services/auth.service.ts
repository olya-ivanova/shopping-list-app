import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService { 
    wrongLoginMessage: string = '';
    isRemember: boolean = false;

    constructor(private http: HttpClient, private router: Router) {}

    login(loginForm: any) {
        this.http.get<any>('http://localhost:3000/signup')
        .subscribe(result => {
          const user = result.filter((user:any) => {
            const isEmail = user.email === loginForm.value.email;
            const isPassword = user.password === loginForm.value.password;
            
            return isEmail && isPassword;
          });
          
          if (user.length !== 0) {
            console.log(user[0].id);
            localStorage.setItem("currentUser", JSON.stringify({id: user[0].id, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), isRemember: this.isRemember}));
            loginForm.reset();
            this.router.navigate(['dashboard']);
          } else {
            loginForm.reset();
            this.wrongLoginMessage = 'User does not exist';
          }
        })
    }

    logout(): void {
        localStorage.removeItem("currentUser");
        this.router.navigate(['/login']);
    }

    isUserLoggedIn(): boolean {
        if (localStorage.getItem("currentUser") != null) {
            return true;
        }
        return false;
    }
}