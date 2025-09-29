import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientServices } from '../../services/common/http-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog, DeleteState } from '../../dialogs/delete-dialog/delete-dialog';
import { Alertify, MessageType } from '../../services/admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class Delete {//td'de çağırılacak, img'a tıklanması ile td'ye tıklanması arasında ui da fark yok

  constructor(private element: ElementRef,//Directive'in çağırıldığı HTML nesnesini aldık 
    private _renderer: Renderer2,
    private httpClientService: HttpClientServices,
    private spinner: NgxSpinnerService,
    private alertifyService: Alertify
  ) { 
     const img =  _renderer.createElement("img"); //image nesnesi oluştur
     img.setAttribute("src", "assets/remove.png");
     img.setAttribute("style", "cursor: pointer;");
     _renderer.appendChild(element.nativeElement, img);// çağırılan HTML içerisine ekle 
  }

  @Input() id: string;//id'yi yakaladık
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();//angular/core'dan geleni import et

  @HostListener("click")//Directive'in kullanıldığı nesneye ne zaman tıklanırsa o zaman onClick çalışsın
  async onClick(){
    this.openDialog(async  () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement; // içten dışa -> img->td->tr 
      this.httpClientService.delete({
        controller: this.controller,
      }, this.id).subscribe(() => {
        $(td.parentElement).fadeOut(500,() => {//animasyon bittikten sonra fonksiyonu devreye sok
          this.callback.emit();//callback fonksiyonu tetiklendi
          this.alertifyService.message("Ürün başarıyla silinmiştir.",{
            messageType: MessageType.Success,
            dismissOthers: true
          })
        }); 
      },(errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertifyService.message("Ürün silinirken beklenmedik bir hata ile karşılaşıldı",{
          messageType: MessageType.Error ,
          dismissOthers: true
        })
      }); 
      
    });
    
  //   const img: HTMLImageElement = event.srcElement;
  //   //alert(id);
  //   //console.log(img.parentElement.parentElement);//img'ı elde ettikten sonra 2 kere parent'e çıkarak o satırı elde etmiş olduk tr elde ettik
  //   $(img.parentElement.parentElement).fadeOut(500);// JQuery çok şükür burda çalıştı :)
  }

  readonly dialog = inject(MatDialog);

  openDialog(closedAfter: any): void {
    const dialogRef = this.dialog.open(DeleteDialog , {
      width: "250px",
      data: DeleteState.Yes ,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes){
        closedAfter();
      }
    });
  }

}
