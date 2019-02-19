import { Component, OnInit, DoCheck, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { FurnitureService } from "../furniture/furniture.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  username: string;
  searchedFurnitures: any;
  isSearched: boolean;
  furnitureStatistic: any;
  usersStatistic: any;
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
    console.log(searchedInput);
    //this.location.replaceState(`/home/?search=${searchedInput}`);
    this.searchText = searchedInput;
    this. furnitures$ = this.furnitureServise.findFurniture(searchedInput).subscribe(res => {
      this.searchedFurnitures = res;
      this.isSearched = true;
    });
    // localStorage.setItem("urlParams", this.route.snapshot.queryParams.search);
    // console.log(this.route.snapshot.queryParams.search);
    this.router.navigate(["/?search"]);
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
  
  ngOnDestroy(){
    this. furnitures$.unsubscribe();
  }

 
  showStatistic() {
    this.isShown = !this.isShown;
  }
}
