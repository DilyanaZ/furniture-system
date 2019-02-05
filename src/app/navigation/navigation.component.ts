import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dropdownLi: string = "nav-item dropdown";
  dropdownMenu: string = "dropdown-menu";
  isLogged: boolean = false;
  username: string;

  constructor(
    private router : Router,
    private authService : AuthService
  ) { 
    this.isLogged = this.authService.isAuthenticated();
   }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
       this.username = JSON.parse(localStorage.getItem('currentUser')).username;
       this.isLogged = true;
    }
   
  }

  logout() {
    localStorage.clear();
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

  expand() {
    this.dropdownLi.endsWith('show') 
    ? this.dropdownLi = "nav-item dropdown" 
    : this.dropdownLi = "nav-item dropdown show";

    this.dropdownMenu.endsWith('show')
    ? this.dropdownMenu = "dropdown-menu"
    : this.dropdownMenu = "dropdown-menu show";
  }
}



