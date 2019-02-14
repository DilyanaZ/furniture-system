import { Component, OnInit } from "@angular/core";
import { CreateFurnitureModel } from "../models/create-furniture.model";
import { FurnitureService } from "../furniture.service";
import { HttpClient } from "@angular/common/http";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";

@Component({
  selector: "app-create-furniture",
  templateUrl: "./create-furniture.component.html",
  styleUrls: ["./create-furniture.component.css"]
})
export class CreateFurnitureComponent implements OnInit {
  bindingModel: CreateFurnitureModel;
  ftu: File = null;
  


  constructor(
    private furnitureService: FurnitureService,
    private http: HttpClient
  ) {
    this.bindingModel = new CreateFurnitureModel("", "", 1950, "", 1, "");
  }

  ngOnInit() {}


  onFileSelected($event) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]); // read file as data url

    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.bindingModel.image = event.target['result'];
    //   }
    // }
    if ($event.target.files.length > 0) {
      
      this.ftu = $event.target.files[0];
      console.log(this.ftu)
      this.bindingModel.image = this.ftu['name'];
      console.log(this.ftu['name']);
    }
  }
  create() {
    this.furnitureService.createFurniture(this.bindingModel).subscribe();
    console.log(this.bindingModel);
  }

}
