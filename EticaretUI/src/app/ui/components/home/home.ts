import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastr, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home extends Base implements OnInit{
  constructor(private toastrService: CustomToastr, spinner: NgxSpinnerService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }

  kaydet(){
    this.toastrService.message("Selam", "Baran", {massageType: ToastrMessageType.Error, position: ToastrPosition.BottomFullWidth});
  }
}
