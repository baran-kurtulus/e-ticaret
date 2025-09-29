import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, ɵHttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StickyOffset } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class HttpClientServices {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string){ }

  private url(requestParameter: Partial<RequestParameters>): string{
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T>{//her fonksiyon tarafından kullanılmayacak değerler objeye dönüştürülmemeli id gibi mesela
    let url: string = "";
    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }
    else{
      url=  `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
    }
    return this.httpClient.get<T>(url, {headers: requestParameter.headers})
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T>{
    let url: string = "";
    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }
    else{
      url=  `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
    }
    return this.httpClient.post<T>(url, body, {headers: requestParameter.headers})
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T>{
    let url: string = "";
    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }
    else{
      url=  `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
    }
    return this.httpClient.put<T>(url, body, {headers: requestParameter.headers});
  }

  delete(requestParameter: RequestParameters, id: string){
    let url: string = "";
    if(requestParameter.fullEndPoint){
      url = requestParameter.fullEndPoint;
    }
    else{
      url=  `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`// Id garanti verileceği için burada id'yi koşulsuz yazdık
    }

    return this.httpClient.delete(url,{headers: requestParameter.headers})
  }
}

export class RequestParameters{
  controller?: string;
  action?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;// baseUrl değişirse
  fullEndPoint?: string; //farklı servislere istek göndermek gerekirse 
}
