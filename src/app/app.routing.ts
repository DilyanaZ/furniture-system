import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { HomeComponent } from "./home/home.component";
import { SigninComponent } from "./authentication/signin/signin.component";
import { SignupComponent } from "./authentication/signup/signup.component";
import { AllFurnitureComponent } from "./furniture/all-furniture/all-furniture.component";
import { FurnitureDetailsComponent } from "./furniture/furniture-details/furniture-details.component";
import { MyFurnitureComponent } from "./furniture/my-furniture/my-furniture.component";
import { CreateFurnitureComponent } from "./furniture/create-furniture/create-furniture.component";
import { AuthGuard } from "./authentication/guards/auth.guard";
import { EditFurnitureComponent } from "./furniture/edit-furniture/edit-furniture.component";
import { SearchedFurnitureComponent } from './furniture/searched-furniture/searched-furniture.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  {
    path: "home",
    children: [
      { path: "?search", component: HomeComponent, data: { shouldReuse: true } }
    ]
  },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "furniture",
    children: [
      { path: "all", component: AllFurnitureComponent },
      {
        path: "details/:id",
        component: FurnitureDetailsComponent,
        canActivate: [AuthGuard]
      },
      { path: "my", component: MyFurnitureComponent, canActivate: [AuthGuard] },
      {
        path: "create",
        component: CreateFurnitureComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "edit/:id",
        component: EditFurnitureComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
