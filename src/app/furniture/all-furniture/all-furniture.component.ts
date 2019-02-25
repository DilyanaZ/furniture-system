import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { FurnitureService } from "../furniture.service";
import { FurnitureModel } from "../models/furniture.model";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "src/app/authentication/auth.service";
import { Furniture } from "../models/furniture";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-all-furniture",
  templateUrl: "./all-furniture.component.html",
  styleUrls: ["./all-furniture.component.css"]
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Observable<Furniture[]>;
 // furnitures: Array<Furniture>;
  furnitures$: Subscription;
  id: string;
  pageSize: number = 3;
  currentPage: number = 1;
  disabled: boolean = false;
  isLogged: boolean;
  isLiked: boolean;
  user: string;

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLogged = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.user = localStorage.getItem("email");
    this.furnitures = this.furnitureService.getAllFurniture();
      
  }

  changePage(page) {
    this.currentPage = page;
  }

  like(id: string) {
    this.furnitureService.like(id, this.user).subscribe(res => {});
    this.isLiked = true;
    this.furnitures = this.furnitureService.getAllFurniture();
  }

  // ngDoCheck(){
  //   this.furnitures$ = this.furnitureService.getAllFurniture().subscribe(res =>
  //   {
  //     this.furnitures = res;
  //   });
  // }
  // ngOnDestroy() {
  //   if (this.furnitures$) {
  //     this.furnitures$.unsubscribe();
  //   }
  // }
}
