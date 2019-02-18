import { Component, OnInit } from "@angular/core";
import { FurnitureModel } from "../models/furniture.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FurnitureService } from "../furniture.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/authentication/auth.service";
import { FileUploadModule } from "ng2-file-upload";

@Component({
  selector: "app-edit-furniture",
  templateUrl: "./edit-furniture.component.html",
  styleUrls: ["./edit-furniture.component.css"]
})
export class EditFurnitureComponent implements OnInit {
  bindingModel: FurnitureModel;
  fileImage: File = null;
  isFileChanged: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private furnitureService: FurnitureService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.furnitureService
      .getFurnitureById(this.route.snapshot.params["id"])
      .subscribe(data => {
        this.bindingModel = data;
        console.log(this.bindingModel);
      });
  }

  edit() {
    this.furnitureService
      .editFurniture(this.bindingModel.id, this.bindingModel)
      .subscribe(
        () => {
          this.toastr.success("Furniture Edited", "Success!");
        },
        err => this.toastr.error("Error!", "Warning!")
      );
    this.router.navigate(["/furniture/my"]);
  }
  onFileSelected($event) {
    if ($event.target.files.length > 0) {
      this.fileImage = $event.target.files[0];
      console.log(this.fileImage);
      this.bindingModel.image = this.fileImage["name"];
      console.log(this.fileImage["name"]);
    }
  }
  changeFile() {
    this.isFileChanged = true;
  }
}
