import { Component, OnInit, OnDestroy } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { Furniture } from '../models/furniture';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit, OnDestroy {
  //furnitures: Observable<Furniture[]>;
  furnitures: Array<Furniture>;
  furnitures$: Subscription;
  //furniture: Furniture;
  id: string;

  pageSize: number = 3;
  currentPage: number = 1;
  disabled: boolean = false;
  isLogged: boolean;
  //isLiked: boolean;
  user: string;
  
  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.isLogged = this.authService.isAuthenticated();
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.user = localStorage.getItem('email');
    this.furnitures$ = this.furnitureService.getAllFurniture().subscribe(res => {
      this.furnitures = res;
      console.log(this.furnitures);
     });
  }

  ngOnDestroy() {
    this.furnitures$.unsubscribe();
  }

  changePage(page) {
    this.currentPage = page;
  }

  like(id: string) {
    this.furnitureService.like(id, this.user).subscribe((res) => {
      // console.log(res);
      // this.furnitureService.getById(id).subscribe(res => {
      //   console.log(res);
      //   let currentFurniture = res;
      //   if(currentFurniture['likes'].indexOf(this.user) >= 0){
      //     this.disabled = true;
      //   } else {
      //     this.disabled = false;
      //   }
      // });
     });
    this.furnitureService.getAllFurniture().subscribe(res => {
      this.furnitures = res;
    });
  }
  


}
