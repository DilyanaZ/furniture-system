import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureReviewModel } from '../models/furniture-review.model';
import { ActivatedRoute } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { Furniture } from '../models/furniture';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furniture: Observable<FurnitureModel>;
  reviewResult: Observable<FurnitureReviewModel[]>;
  id: string;
  likesCount: number = 0;

  furnitureReview: FurnitureReviewModel;
  ratings: number[];
  itemLikes: number = 0;
  isOpinionsShown: boolean = false;

  constructor(private route: ActivatedRoute,
    private furnitureService: FurnitureService) {
    this.id = this.route.snapshot.params['id'];
    this.furnitureReview = new FurnitureReviewModel("", 1);
    this.ratings = [1, 2, 3, 4, 5];
     }

  ngOnInit() {
    this.furniture = this.furnitureService.getFurnitureDetails(this.id);
    this.reviewResult = this.furnitureService.getFurnitureReview(this.id);
  }

  getOpinions() {
    this.isOpinionsShown = !this.isOpinionsShown;
  }

  sendReview() {
    //console.log(data);
    this.furnitureService.sendFurnitureRewiew(this.id, this.furnitureReview).subscribe();
    console.log(this.furnitureReview);
  }
  
  like(id:string) {
    this.likesCount++;
    // for (let index = 0; index < this.furnitures.length; index++) {
    //   this.furniture = this.furnitures[index];
    //   if (this.user.email === this.furniture.createdBy && !this.user.isLiked) {
    //     this.itemLikes++;
    //     this.user.isLiked = true;
    //   }
    //      console.log(this.user.email, this.user.isLiked);
    // }
    let user = localStorage.getItem('email');
    this.furnitureService.like(id, user).subscribe(res => {
      console.log(res);
    })
  }
}
