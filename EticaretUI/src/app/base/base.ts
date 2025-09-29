import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class Base {
  constructor(private spinner: NgxSpinnerService){}

  showSpinner(spinnerNameType: SpinnerType){
    this.spinner.show(spinnerNameType);

    setTimeout(() => this.hideSpinner(spinnerNameType), 3000); // Test için 3 saniye sonra otomatik kapanacak
  }

  hideSpinner(spinnerNameType: SpinnerType){
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType{
  BallAtom = "s1",
  BallScaleMultiple = "s2",
  BallSpinClockwiseFadeRotating = "s3"
}
