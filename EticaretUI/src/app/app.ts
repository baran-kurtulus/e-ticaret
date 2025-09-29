import { AfterViewInit, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Layout } from './admin/layout/layout';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CustomToastr, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';


declare var $: any

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout, RouterLink, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  protected readonly title = signal('EticaretUI');
  

  
  

  












  //Jquery için
  private platformId = inject(PLATFORM_ID)

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // jQuery henüz global değilse burada da (gerekirse) dinamik yükleyebilirsin
      const ensureJQ = (async () => {
        if (!(window as any).$) {
          const mod = await import('jquery');
          (window as any).$ = (mod as any).default ?? (mod as any);
          (window as any).jQuery = (window as any).$;
        }
        return (window as any).$;
      })();

      // ensureJQ.then(($: any) => {
      //   // $(document).ready gerekmez; ngAfterViewInit zaten "DOM hazır"
      //   // ama istersen:
      //   $.get("https://localhost:7110/api/products", data => {
      //   console.log(data);
      //   })
      // });
    }
  }
}
