import { Routes } from "@angular/router";
import { Baskets } from "./baskets";

export const basketsRoutes: Routes = [
    {path: "", component: Baskets }// Birden fazla rota olduğunda bir şeyler verilebilir en üst modülde zaten ayrıştırılacak
];