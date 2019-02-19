import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FurnitureModel } from "./models/furniture.model";
import { CreateFurnitureModel } from "./models/create-furniture.model";
import { FurnitureReviewModel } from "./models/furniture-review.model";
import { Furniture } from "./models/furniture";

const createUrl = "http://localhost:5000/furniture/create";
const allUrl = "http://localhost:5000/furniture/all";
const detailsUrl = "http://localhost:5000/furniture/details/";
const myFurnitureUrl = "http://localhost:5000/furniture/mine";
const deleteUrl = "http://localhost:5000/furniture/delete/";
const searchUrl = "http://localhost:5000/furniture/all?search=";
const statsUrl = "http://localhost:5000/stats";
const getFurnitureByIdUrl = "http://localhost:5000/furniture/";
const editFurnitureUrl = "http://localhost:5000/furniture/edit/";

@Injectable({
  providedIn: "root"
})
export class FurnitureService {
  isSearched: boolean;
  constructor(private http: HttpClient) {}

  createFurniture(body: CreateFurnitureModel) {
    return this.http.post(createUrl, body);
  }
  getAllFurniture() {
    return this.http.get<Furniture[]>(allUrl);
  }
  getFurnitureDetails(id: string) {
    //
    return this.http.get<Furniture>(detailsUrl + id);
  }
  getMyFurniture() {
    return this.http.get<FurnitureModel[]>(myFurnitureUrl);
  }
  deleteFurniture(id: string) {
    return this.http.delete(deleteUrl + id);
  }
  findFurniture(searchedInput: string) {
    return this.http.get<FurnitureModel[]>(searchUrl + searchedInput);
  }
  getStatistic() {
    return this.http.get<Object>(statsUrl);
  }
  sendFurnitureRewiew(id: string, body: FurnitureReviewModel) {
    return this.http.post(
      "http://localhost:5000/furniture/details/" + id + "/reviews/create",
      body
    );
  }
  getFurnitureReview(id: string) {
    return this.http.get<FurnitureReviewModel[]>(
      "http://localhost:5000/furniture/details/" + id + "/reviews"
    );
  }
  like(id: string, body: string) {
    return this.http.post(
      "http://localhost:5000/furniture/details/" + id + "/like",
      body
    );
  }
  // ------------------------------------------------------------------------------------------------------
  getFurnitureById(id: string) {
    return this.http.get<FurnitureModel>(getFurnitureByIdUrl + id);
  }
  editFurniture(id: string, body: CreateFurnitureModel) {
    return this.http.put(editFurnitureUrl + id, body);
  }
  getById(id: string) {
    return this.http.get<Furniture>(getFurnitureByIdUrl + id);
  }
}
