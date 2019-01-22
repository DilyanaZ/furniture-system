import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateComponentOptions } from '@angular/core/src/render3/component';

const createUrl = "http://localhost:5000/furniture/create";
const allUrl = "http://localhost:5000/furniture/all";
const detailsUrl = "http://localhost:5000/furniture/details/";
const myFurnitureUrl = "http://localhost:5000/furniture/mine";
const deleteUrl = "http://localhost:5000/furniture/delete/";


@Injectable({
    providedIn: 'root'
})

export class FurnitureServise {
    constructor(private http: HttpClient) {

    }

    createFurniture(body: CreateComponentOptions) {
        return this.http.post(createUrl, body);
    }

}
