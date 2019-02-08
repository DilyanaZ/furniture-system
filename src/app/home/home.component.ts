import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { FurnitureService } from '../furniture/furniture.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Form } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  searchedFurnitures: any;
  isSearched: boolean;
  statistic: Object;
  isShown: boolean = false;
  urlParams: string;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private furnitureServise: FurnitureService,
    private router: Router,
    private location: Location
  ) { }

  searchFurniture(searchedInput) {
    console.log(searchedInput);
    console.log(this.router.url);
    // if (window.location.search.endsWith(this.urlParams)) {
    //   this.furnitureServise.findFurniture(this.urlParams).subscribe(res => {
    //     this.searchedFurnitures = res;
    //   });
    // }

    this.furnitureServise.findFurniture(searchedInput).subscribe(res => {
      this.searchedFurnitures = res;
      this.isSearched = true;
    });

    this.location.replaceState(`/home/?search=${searchedInput}`);
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    }
    this.furnitureServise.getStatistic().subscribe(data => {
      this.statistic = data;
    });
  }
 
  showStatistic() {
    this.isShown = !this.isShown;
  }

}
