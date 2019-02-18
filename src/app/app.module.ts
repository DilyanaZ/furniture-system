import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";
import { CustomFormsModule } from "ng2-validation";
import { NgxPaginationModule } from "ngx-pagination";
import { FileUploadModule } from "ng2-file-upload";

import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from "@angular/router";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { SigninComponent } from "./authentication/signin/signin.component";
import { SignupComponent } from "./authentication/signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { AuthService } from "./authentication/auth.service";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { CreateFurnitureComponent } from "./furniture/create-furniture/create-furniture.component";
import { AllFurnitureComponent } from "./furniture/all-furniture/all-furniture.component";
import { FurnitureDetailsComponent } from "./furniture/furniture-details/furniture-details.component";
import { MyFurnitureComponent } from "./furniture/my-furniture/my-furniture.component";
import { EditFurnitureComponent } from "./furniture/edit-furniture/edit-furniture.component";
import { CustomRouteReuseStategy } from "./home/CustomRouteReuseStategy";
import { SearchedFurnitureComponent } from './furniture/searched-furniture/searched-furniture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    CreateFurnitureComponent,
    AllFurnitureComponent,
    FurnitureDetailsComponent,
    MyFurnitureComponent,
    EditFurnitureComponent,
    SearchedFurnitureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CustomFormsModule,
    NgxPaginationModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
