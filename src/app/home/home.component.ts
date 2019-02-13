import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../authentication/auth.service";
import { FurnitureService } from "../furniture/furniture.service";
import { ActivatedRoute } from "@angular/router";
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
  //statistic: Object;
  furnitureStatistic: any;
  usersStatistic: any;
  isShown: boolean = false;
  urlParams: string;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private furnitureServise: FurnitureService,
    private router: Router,
    private location: Location
  ) {}

  searchFurniture(searchedInput) {
    console.log(searchedInput);
    this.furnitureServise.findFurniture(searchedInput).subscribe(res => {
      this.searchedFurnitures = res;
      this.isSearched = true;
    });

    this.location.replaceState(`/home/?search=${searchedInput}`);
    console.log(this.router.url);
    console.log(this.route.snapshot.queryParams);
    this.urlParams = this.route.snapshot.queryParams.search;
    localStorage.setItem("params", this.urlParams);
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      this.username = JSON.parse(localStorage.getItem("currentUser")).username;
    }
    this.furnitureServise.getStatistic().subscribe(data => {
      this.furnitureStatistic = data['furniture'];
      this.usersStatistic = data['users'];
      console.log(this.furnitureStatistic, this.usersStatistic);
    });
    if (localStorage.getItem(JSON.stringify("params")) === this.urlParams) {
      this.furnitureServise.findFurniture(this.urlParams).subscribe(res => {
        this.searchedFurnitures = res;
      });
    }
  }

  showStatistic() {
    this.isShown = !this.isShown;
  }
  changePage(page) {
    this.currentPage = page;
  }
}
