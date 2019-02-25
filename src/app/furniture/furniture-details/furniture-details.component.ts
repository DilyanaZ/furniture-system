import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureReviewModel } from '../models/furniture-review.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Furniture } from '../models/furniture';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furniture: Observable<Furniture>;
  reviewResult: Observable<FurnitureReviewModel[]>;
  id: string;
  furnitureReview: FurnitureReviewModel;
  ratings: number[];
  isOpinionsShown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private furnitureService: FurnitureService,
    private location: Location,
    private router: Router) {
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
    this.furnitureService.sendFurnitureRewiew(this.id, this.furnitureReview).subscribe();
    console.log(this.furnitureReview);
    this.furnitureReview = new FurnitureReviewModel("", 1);
  }
  goBack(){
    this.router.navigate(['/home/?search']);
  }

}
