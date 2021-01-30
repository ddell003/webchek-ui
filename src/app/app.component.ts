import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webchek-ui';
  userIsAuthenticated = false;

  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log("isAuth", isAuthenticated)
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    if(this.authListenerSubs){
      this.authListenerSubs.unsubscribe();
    }
  }

  onLogout(){
    this.authService.logout();
  }

  showSites(){
    return this.userIsAuthenticated;
  }
}
