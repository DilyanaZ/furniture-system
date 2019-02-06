import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { FurnitureService } from '../furniture/furniture.service';
import { FurnitureModel } from '../furniture/models/furniture.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  email: string;
  searchedFurnitures: any;
  isSearched: boolean;
  statistic: Object;
  isShown: boolean = false;


  constructor(private router: Router,
    private authService: AuthService,
    private furnitureServise: FurnitureService
  ) { }

  searchFurniture(searchedInput) {
    console.log(searchedInput);
    this.furnitureServise.findFurniture(searchedInput).subscribe(res => {
      this.searchedFurnitures = res;
      this.isSearched = true;
    });
    console.log(this.searchedFurnitures);
    this.isSearched = true;
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.username = JSON.parse(localStorage.getItem('currentUser')).username;
      this.email = JSON.parse(localStorage.getItem('currentUser')).email;
    }
    this.furnitureServise.getStatistic().subscribe(data => {
      this.statistic = data;
    });
  }

  showStatistic() {
    this.isShown = !this.isShown;
  }

}
