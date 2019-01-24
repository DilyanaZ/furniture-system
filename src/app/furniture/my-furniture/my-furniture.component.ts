import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>;
  constructor(private furnitureServise: FurnitureService,
    private router: Router) {

   }

  ngOnInit() {
    this.furnitures = this.furnitureServise.getMyFurniture()
  }
  deleteItem(id: string){
    this.furnitureServise.deleteFurniture(id).subscribe(() => {
      alert('You have deleted one Item!');
      this.router.navigate(['/furniture/all']);
    });
  }

}
