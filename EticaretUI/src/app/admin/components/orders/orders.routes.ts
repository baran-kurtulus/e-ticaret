import { Routes } from "@angular/router";
import { Orders } from "./orders"; 

export const ordersRoutes: Routes = [
    {path: "", component: Orders }// Birden fazla rota olduğunda bir şeyler verilebilir en üst modülde zaten ayrıştırılacak
];