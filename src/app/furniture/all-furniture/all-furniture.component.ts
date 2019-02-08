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
  disabled: boolean;
  isLogged: boolean;
  //isLiked: boolean;
  user: string;

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.isLogged = this.authService.isAuthenticated();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    //this.furnitures = this.furnitureService.getAllFurniture();
    this.user = localStorage.getItem('email');
    this.furnitures$ = this.furnitureService.getAllFurniture().subscribe(res => {
      this.furnitures = res;
      console.log(this.furnitures);
      this.furnitures.forEach((furniture, index) => {
        if(this.furnitures[index]['likes'].indexOf(this.user) !== -1){
          this.disabled = true;
        }
      });
    });
  }
   
  ngOnDestroy(){
    this.furnitures$.unsubscribe();
  }

  changePage(page) {
    this.currentPage = page;
  }

  like(id: string) {
    this.furnitureService.like(id, this.user).subscribe(res => {
      console.log(res);
      this.router.navigate(['/furniture/all']);
    });
        // if (this.furniture.likes.indexOf(this.user) == -1) {
    //   this.isLiked = false;
    //   console.log(this.furniture.likes, this.isLiked);
    // } else {
    //   this.isLiked = true;
    // }
    window.location.reload();
  }


}
