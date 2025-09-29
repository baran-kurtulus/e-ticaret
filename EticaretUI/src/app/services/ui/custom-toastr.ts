import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastr {
  constructor(private toastr: ToastrService){}

  message(message: string, title: string, options: Partial<ToastrOptions>){
    this.toastr[options.massageType](message, title, {positionClass: options.position});
  }
}

export class ToastrOptions{
  massageType: ToastrMessageType;
  position: ToastrPosition;
}

export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"
}
