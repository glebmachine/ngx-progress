import { Component, OnInit } from '@angular/core';
import { NprogressService } from '@betadigitalproduction/ngx-nprogress';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styles: [
    `
      nprogress {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  constructor(public nprogress: NprogressService) {
  }

  ngOnInit() {
    this.nprogress.start();
    setTimeout(this.nprogress.end.bind(this.nprogress), 2000);
  }
}
