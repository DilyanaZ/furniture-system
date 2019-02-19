import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouteReuseStrategy
} from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { FurnitureService } from "../furniture/furniture.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  dropdownLi: string = "nav-item dropdown";
  dropdownMenu: string = "dropdown-menu";
  dropdownLiSearch: string = "nav-item dropdown";
  dropdownMenuSearch:string = "dropdown-menu";
  isSearched: boolean;
  isLogged: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    public furnitureService: FurnitureService) {
    this.isLogged = this.authService.isAuthenticated();
    this.isSearched = furnitureService.isSearched;
  }

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.isLogged = false;
    this.router.navigate(["/home"]);
  }

  expand() {
    this.dropdownLi.endsWith("show")
      ? (this.dropdownLi = "nav-item dropdown")
      : (this.dropdownLi = "nav-item dropdown show");

    this.dropdownMenu.endsWith("show")
      ? (this.dropdownMenu = "dropdown-menu")
      : (this.dropdownMenu = "dropdown-menu show");
  }

  expandSearch() {
    this.dropdownLiSearch.endsWith("show")
      ? (this.dropdownLiSearch = "nav-item dropdown")
      : (this.dropdownLiSearch = "nav-item dropdown show");
     this.dropdownMenuSearch.endsWith("show")
      ? (this.dropdownMenuSearch = "dropdown-menu")
      : (this.dropdownMenuSearch = "dropdown-menu show");

  }

}
