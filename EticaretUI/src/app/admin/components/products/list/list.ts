import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { List_Products } from '../../../../contracts/list_products';
import { ProductService } from '../../../../services/common/product-service';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType } from '../../../../services/admin/alertify';
import { Delete } from "../../../../directives/admin/delete";


declare var $: any;

@Component({
  selector: 'app-list',
  imports: [MatTableModule, MatPaginator, MatPaginatorModule, Delete],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List extends Base implements OnInit{

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertifyService: Alertify
  ){
    super(spinner);
  }
 
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Products> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async pageChanged(){
    await this.getProducts();// sadece sayfa değişiminde getProducts'ı tetiklemek yeterli yeni page değerlerini almış olacak 
  }

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom)
    const allProducts: {totalCount: number, products: List_Products[]} = await this.productService.read((this.paginator ? this.paginator.pageIndex : 0),
     (this.paginator ? this.paginator.pageSize : 5),
      () => this.hideSpinner(SpinnerType.BallAtom), (errorMessage) => {
        this.hideSpinner(SpinnerType.BallAtom)
        this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
        })
      });

    this.dataSource = new MatTableDataSource<List_Products>(allProducts.products)
    this.paginator.length = allProducts.totalCount;
    //this.dataSource.paginator = this.paginator; // Paging için
  }

  async ngOnInit() {
    await this.getProducts();
  }

  // delete(id: string, event){
  //   const img: HTMLImageElement = event.srcElement;
  //   //alert(id);
  //   //console.log(img.parentElement.parentElement);//img'ı elde ettikten sonra 2 kere parent'e çıkarak o satırı elde etmiş olduk tr elde ettik
  //   $(img.parentElement.parentElement).fadeOut(500);// JQuery çok şükür burda çalıştı :)
  // }

  
}
