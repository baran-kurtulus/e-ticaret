import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
//ngx-file-drop kütüphanesi kurulmalı -> npm install ngx-file-drop --save
import { FileSystemFileEntry, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop'
import { HttpClientServices } from '../http-client';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Alertify, MessageType } from '../../admin/alertify';
import { CustomToastr, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr';
@Component({
  selector: 'app-file-upload',
  imports: [NgxFileDropModule, NgFor, NgForOf, NgIf ],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss'
})
export class FileUpload {

  constructor(private httpClientService: HttpClientServices, private alertifyService: Alertify, private customToastrService: CustomToastr ){}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {// NgxFileDropEntry ile işlem yapılamıyor o yüzden FileSystemFileEntry' e çevirdik
        fileData.append(_file.name, _file, file.relativePath);//fileName yerine de _file.name verilebilir
      })
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers:  new HttpHeaders({"responseType": "blob"}) //Bunun verilmesi gerekiyor
    }, fileData).subscribe(data => {

      const message: string = "Dosyalar başarıyla yüklenmiştir.";

      if(this.options.isAdminPage){
        this.alertifyService.message(message,{
          messageType: MessageType.Success,
          dismissOthers: true,
        })
      }
      else{
        this.customToastrService.message(message, "Başarılı", {
          massageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomRight
        })
      }
    }, (errorResponse: HttpErrorResponse) => {

      const message: string = "Dosyalar yüklenirken beklenmeyen bir hata ile karşılaşıldı";

      if(this.options.isAdminPage){
        this.alertifyService.message(message,{
          messageType: MessageType.Error,
          dismissOthers: true,
        })
      }
      else{
        this.customToastrService.message(message, "Başarısız", {
          massageType: ToastrMessageType.Error,
          position: ToastrPosition.BottomRight
        })
      }
    })

  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}

export class FileUploadOptions{
  controller?: string; 
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false // Adminde alertify ui da toastr kullandığımız için
}
