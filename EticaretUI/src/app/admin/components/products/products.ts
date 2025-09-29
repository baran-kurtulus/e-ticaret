import { Component, OnInit, ViewChild } from '@angular/core';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientServices } from '../../../services/common/http-client';
import { CreateProduct } from '../../../contracts/create_product';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Create } from './create/create';
import { List } from './list/list';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-products',
  imports: [MatSidenavModule, Create, List, MatDialogModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products extends Base implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientServices){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    // this.httpClientService.get<Product[]>({// Api dan gelecek veri türünü karşılayacak product contractı
    //   controller: "products",
    // }).subscribe(data => console.log());

    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "kalem",
    //   stock: 120,
    //   price: 15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // },{
    //   id: "019962a7-e7b9-7f68-8168-7106b0bb2248",
    //   name: "Apple Pencil Pro",
    //   stock: 110,
    //   price: 7599
    // }).subscribe()

    // this.httpClientService.delete({
    //   controller: "products",
    // },"019962a7-e7b9-7f68-8168-7106b0bb2248").subscribe();

    // this.httpClientService.get({
    //   fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=> console.log(data));
  }

  @ViewChild(List) listComponents: List;

  createdProduct(createdProduct: CreateProduct){
    this.listComponents.getProducts();//create'te create gerçekleştiğinde list'teki getproduct birdaha çağırılacak
  }
}
