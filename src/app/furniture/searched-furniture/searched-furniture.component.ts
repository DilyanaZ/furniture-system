import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/authentication/auth.service";
import { FurnitureService } from "../furniture.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: 'app-searched-furniture',
  templateUrl: './searched-furniture.component.html',
  styleUrls: ['./searched-furniture.component.css']
})
export class SearchedFurnitureComponent implements OnInit {
  @Input() searchedFurnitures: any;
  @Input() isLogged: boolean;

  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private furnitureServise: FurnitureService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  changePage(page) {
    this.currentPage = page;
  }
}
