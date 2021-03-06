import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { FurnitureService } from "../furniture/furniture.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  username: string;
  searchedFurnitures: any;
  furnitureStatistic: any;
  usersStatistic: any;
  isSearched: boolean;
  isShown: boolean = false;
  urlParams: string;
  searchText: string;
  isLogged: boolean = false;
  furnitures$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private furnitureServise: FurnitureService,
    private router: Router,
    private location: Location
  ) {
    this.searchText = "";
  }

  searchFurniture(searchedInput) {
    console.log("this searchedInput" + searchedInput, this.searchText);
    this.location.replaceState(`/home/?search=${searchedInput}`);
    this.searchText = searchedInput;
    this.isSearched = true;
    this.furnitureServise.isSearched = true;
    this.furnitures$ = this.furnitureServise
      .findFurniture(searchedInput)
      .subscribe(res => {
        this.searchedFurnitures = res;
      });
           this.router.routeReuseStrategy;
      
      this.router.navigate(['/home/?search']);
      // this.router.navigate(
      //   [], 
      //   {
      //     relativeTo: this.route,
      //     queryParams: { search: this.searchText },
      //     queryParamsHandling: "merge"
      //   });
        console.log(this.route.firstChild);
   }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      this.username = JSON.parse(localStorage.getItem("currentUser")).username;
      this.isLogged = true;
    }
    this.furnitureServise.getStatistic().subscribe(data => {
      this.furnitureStatistic = data["furniture"];
      this.usersStatistic = data["users"];
      console.log(this.furnitureStatistic, this.usersStatistic);
    });
    this.furnitureServise.findFurniture(this.searchText).subscribe(res => {
      this.searchedFurnitures = res;
    });
  }

  showStatistic() {
    this.isShown = !this.isShown;
  }

  ngOnDestroy() {
    if (this.furnitures$) {
      this.furnitures$.unsubscribe();
    }
  }
}
