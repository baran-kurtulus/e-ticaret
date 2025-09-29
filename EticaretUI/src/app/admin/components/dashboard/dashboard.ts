import { Component, OnInit } from '@angular/core';
import { Alertify, AlertifyOptions, MessageType, Position } from '../../../services/admin/alertify';
import { Base, SpinnerType } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard extends Base implements OnInit {
  constructor(private alertify: Alertify, spinner: NgxSpinnerService){ super(spinner) }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
  }
  m(){
    this.alertify.message("Merhaba", {
      messageType: MessageType.Success,
      position: Position.BottomRight,
      delay: 3,
    });

  }
  d(){
    this.alertify.dismiss();
  }

  
}
