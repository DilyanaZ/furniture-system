import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { FurnitureService } from "../furniture/furniture.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Location } from "@angular/common";
import { map } from "rxjs/operators";
import { Form } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  username: string;
  searchedFurnitures: any;
  isSearched: boolean;
  furnitureStatistic: any;
  usersStatistic: any;
  isShown: boolean = false;
  urlParams: string;
  searchText: string;
  isLogged: boolean = false;

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
    this.furnitureServise.findFurniture(searchedInput).subscribe(res => {
      this.searchedFurnitures = res;
      this.isSearched = true;
    });
    // localStorage.setItem("urlParams", this.route.snapshot.queryParams.search);
    // console.log(this.route.snapshot.queryParams.search);
    this.router.navigate(['/?search']);
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
    // if (localStorage.getItem("urlParams")) {
    //   this.searchText = localStorage.getItem("urlParams");
    // } else {
    //   this.searchText = "";
    // }
  }

  showStatistic() {
    this.isShown = !this.isShown;
  }
 
}
