import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';//Form nesneleri için bunun da eklenmesi gerekiyor
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from '../../../../services/common/product-service';
import { CreateProduct } from '../../../../contracts/create_product';
import { Base, SpinnerType } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType } from '../../../../services/admin/alertify';
import { error } from 'node:console';
import { FileUpload, FileUploadOptions } from '../../../../services/common/file-upload/file-upload';


@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FileUpload],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create extends Base{
  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: Alertify) {
    super(spinner);
   }

   @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter(); 

   //bu değer dışarı gideceği için output olarak işaretledik fileUpload içerisinde kullanılacak 
   @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürükleyin veya seçin.",
    isAdminPage: true,
    accept: ".png, .jpg, .jpeg, .json"// sadece ilgili uzantıda olan dosyaları göstermeyi sağlar
   };

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    

    if(!name.value){
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Lütfen ürün adını giriniz.", {
        messageType: MessageType.Error,
        dismissOthers: true,
      });
      return;
    }

    if(parseInt(stock.value) < 0){
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Stok sayısı sıfırdan küçük olamaz.", {
        messageType: MessageType.Error,
        dismissOthers: true,
      });
      return;
    }

    if(parseFloat(price.value) < 0){
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Fiyat bilgisi sıfırdan küçük olamaz", {
        messageType: MessageType.Error,
        dismissOthers: true,
      });
      return;
    }

    const createProduct: CreateProduct = new CreateProduct();
    createProduct.name = name.value;
    createProduct.price = parseFloat(price.value);
    createProduct.stock = parseInt(stock.value);

    this.productService.createProduct(createProduct, () => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Ürün başarıyla eklenmiştir", {
        messageType: MessageType.Success,
        dismissOthers: true,
      })

      this.createdProduct.emit(createProduct);// Product Component'e createProduct fırlattık
    }, errorMessage => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message(errorMessage, {
        messageType: MessageType.Error,
        dismissOthers: true,
      });
    });//callback metodu

    
  }
}
