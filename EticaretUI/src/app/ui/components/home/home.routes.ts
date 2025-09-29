import { Routes } from "@angular/router";
import { Home } from "./home"; 

export const homeRoutes: Routes = [
    {path: "", component: Home }// Birden fazla rota olduğunda bir şeyler verilebilir en üst modülde zaten ayrıştırılacak
];