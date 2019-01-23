import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Observable <FurnitureModel[]>;

  constructor(private furnitureServise : FurnitureService) { }

  //kato vzimame vs.items
  ngOnInit() {
    this.furnitures = this.furnitureServise.getAllFurniture();
  }

}
