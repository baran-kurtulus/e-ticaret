import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { isPlatformBrowser } from '@angular/common';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';



@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar, Footer, RouterModule, MatSidenavModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout{// AfterViewInit içerisinde çağırmazsan SSR hatası alırsın (alertify için)
  //private platformId = inject(PLATFORM_ID) afterviewinit içerisinde çalışırken platformid'li bir if gerekli (alertify için)
  
}
