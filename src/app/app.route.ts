import { Routes } from "@angular/router";
import { HomePage } from "./page/home/home.page";
import { ErrorPage } from "./page/error/error.page";

export const appRoute: Routes = [
  {
    path: "home",
    component: HomePage,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "error",
    component: ErrorPage,
  },
  {
    path: "**",
    redirectTo: "/error",
  },
];
