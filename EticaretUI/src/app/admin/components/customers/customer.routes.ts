import { Routes } from "@angular/router";
import { Customers } from "./customers";

export const customerRoutes: Routes = [
    {path: "", component: Customers }// Birden fazla rota olduğunda bir şeyler verilebilir en üst modülde zaten ayrıştırılacak
];