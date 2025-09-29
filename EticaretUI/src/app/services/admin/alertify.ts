import { Injectable } from '@angular/core';
declare var alertify: any
@Injectable({
  providedIn: 'root'
})
export class Alertify {
  //message(message: string, messageType: MessageType, position: Position, delay: Number = 3, dismissOthers: boolean = false)
  message(message: string, options: Partial<AlertifyOptions>)//Partial yapıldığında direkt {} içerisinde değerler verilebilecek
  {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msg = alertify[options.messageType](message);//JS özelliği direkt olarak hangisi geldiyse onu çağırmayı sağlıyor

    if(options.dismissOthers)
      msg.dismissOthers();
    
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;

}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}
