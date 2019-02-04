import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureReviewModel } from '../models/furniture-review.model';
import { ActivatedRoute } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furniture: Observable<FurnitureModel>;
  reviewResult: Observable<FurnitureReviewModel[]>;
  id: string;

  currentUser = {
    username: "",
    alreadyLiked: false
  };


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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.currentUser.username = JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }

  getOpinions() {
    this.isOpinionsShown = !this.isOpinionsShown;
  }

  like() {
    if (this.currentUser.username && !this.currentUser.alreadyLiked) {
      this.itemLikes++;
      this.currentUser.alreadyLiked = true;
    }
    this.furnitureService.like(this.id, this.currentUser).subscribe();
    console.log(this.currentUser.username, this.currentUser.alreadyLiked);
  }

  sendReview() {
    //console.log(data);
    this.furnitureService.sendFurnitureRewiew(this.id, this.furnitureReview).subscribe();
    console.log(this.furnitureReview);
  }
}
