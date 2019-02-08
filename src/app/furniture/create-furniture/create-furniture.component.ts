import { Component, OnInit } from '@angular/core';
import { CreateFurnitureModel } from '../models/create-furniture.model';
import { FurnitureService } from '../furniture.service'

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})


export class CreateFurnitureComponent implements OnInit {
  bindingModel: CreateFurnitureModel;

  constructor(private furnitureService: FurnitureService) {
    this.bindingModel = new CreateFurnitureModel("", "", 1950, "", 1, "");
  }

  ngOnInit() {
  }

  create() {
    this.furnitureService.createFurniture(this.bindingModel).subscribe();
    console.log(this.bindingModel);
  }
  // onFileSelected(event){
  //     console.log(event);
  //     //console.log(this.bindingModel.imageFile);
  // }  
}
