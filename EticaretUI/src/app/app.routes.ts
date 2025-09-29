import { Routes } from '@angular/router';
import { Layout } from './admin/layout/layout';
import { Dashboard } from './admin/components/dashboard/dashboard';
import { Home } from './ui/components/home/home';

export const routes: Routes = [
    { // Admin Layout
        path: "admin", component: Layout, children:
        [
            { path: "", component: Dashboard },// Boş çağırılacaksa direkt component çağırılmalı
            //customers'tan sonrasını customerRoutes'ta ara demek
            { path: "customers", loadChildren: () => import("./admin/components/customers/customer.routes").then
                (module => module.customerRoutes) }, //lazy load yapısı
            { path: "products", loadChildren: () => import("./admin/components/products/products.routes").then
                (module => module.productsRoutes) }, //lazy load yapısı
            { path: "orders", loadChildren: () => import("./admin/components/orders/orders.routes").then
                (module => module.ordersRoutes) },
        ]
    },
    //Ana Layout'ta tek tek obje verilir loadChildren kullanılmaz çünkü ana layout'ta eksta layoutComponent yok
    { path: "", component: Home },
    { path: "basket", loadChildren: () => import("./ui/components/baskets/baskets.routes").then
        (module => module.basketsRoutes)
     },
    { path: "product", loadChildren: () => import("./ui/components/products/products.routes").then
        (module => module.uiproductsRoutes)
     },
    

];
