import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  param = {value: 'world'};
  constructor(private router: Router, 
    public translate: TranslateService,
    private authService: AuthenticationService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = String(translate.getBrowserLang());
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }

}
