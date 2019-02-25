import { Component, OnInit } from "@angular/core";
import { FurnitureService } from "../furniture.service";
import { FurnitureModel } from "../models/furniture.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-furniture",
  templateUrl: "./my-furniture.component.html",
  styleUrls: ["./my-furniture.component.css"]
})
export class MyFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private furnitureServise: FurnitureService,
    private router: Router
  ) {}

  ngOnInit() {
    this.furnitures = this.furnitureServise.getMyFurniture();
  }

  deleteItem(id: string) {
    console.log(id);
    this.furnitureServise.deleteFurniture(id).subscribe(data => {
      alert(data["message"]);
      this.furnitures = this.furnitureServise.getMyFurniture();
    });
  }

  changePage(page) {
    this.currentPage = page;
  }
}
