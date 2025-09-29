import { Routes } from "@angular/router";
import { Products } from "./products"; 

export const uiproductsRoutes: Routes = [
    {path: "", component: Products }// Birden fazla rota olduğunda bir şeyler verilebilir en üst modülde zaten ayrıştırılacak
];