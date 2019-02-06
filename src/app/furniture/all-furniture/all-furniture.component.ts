import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { Furniture } from '../models/furniture';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {

  furnitures: Array<Furniture>;
  furniture: Furniture;
  furnitureUsersEmails: Array<string>;
  furnitureUsers: Array<Object>;
  id: string;

  pageSize: number = 3;
  currentPage: number = 1;

  isLogged: boolean;
  
  user = {
    email: "",
    isLiked: false
  };
  visitedtUser = {
    furnitureId: -1,
    email: "",
    isLiked: false
  };

  constructor(private furnitureServise: FurnitureService,
    private route: ActivatedRoute,
    private authService: AuthService) {
    this.isLogged = this.authService.isAuthenticated();
    this.id = this.route.snapshot.params['id'];
    this.furnitureUsersEmails = [];
  }

  ngOnInit() {
    this.furnitureServise.getAllFurniture().subscribe(res => {
      this.furnitures = res;
      console.log(this.furnitures);
      //console.log(this.furnitureUsersEmails);
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user) {
      this.user.email = JSON.parse(localStorage.getItem('currentUser')).email;
    }
  }

  changePage(page) {
    this.currentPage = page;
  }
  

}
