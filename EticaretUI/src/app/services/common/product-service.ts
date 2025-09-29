import { Injectable } from '@angular/core';
import { HttpClientServices } from './http-client';
import { CreateProduct } from '../../contracts/create_product';
import { error } from 'node:console';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Products } from '../../contracts/list_products';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClientServices: HttpClientServices){}

  createProduct(product: CreateProduct, successCallback?: () => void, errorCallback?: (errorMessage: string) => void){
    this.httpClientServices.post({
      controller: "products"
    }, product).subscribe(result=> {
      successCallback();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallback(message);
    });
  }

  async read(page: number = 0, size: number = 5,  successCallback?: () => void, errorCallback?: (errorMessage) => void): Promise<{totalCount: number, products: List_Products[]}>{
    const promiseData: Promise<{totalCount: number, products: List_Products[]}> = this.httpClientServices.get<{totalCount: number, products: List_Products[]}>({
      controller: "products",
      queryString: `page=${page}&size=${size}`,
    }).toPromise();// toPromise sayesinde await kullanabildik

    // then() başarı durumu catch() hata durumu
    promiseData.then(d => successCallback())
      .catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message));

    return await promiseData;
  }

  async delete(id: string){
    const deleteObservable: Observable<any> = this.httpClientServices.delete({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable)//Promise yerine yeni kullanım 
  }
}
