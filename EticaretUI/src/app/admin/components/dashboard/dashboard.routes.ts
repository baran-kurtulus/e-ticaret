import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard"; 

export const dashboardRoutes: Routes = [
    {path: "", component: Dashboard }// Birden fazla rota olduğunda bir şeyler verilebilir en üst modülde zaten ayrıştırılacak
];