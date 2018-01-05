import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NprogressModule } from '@betadigitalproduction/ngx-nprogress';

import { AppComponent }  from './app.component';
import { PlatformService } from '@betadigitalproduction/ngx-platform-service';

@NgModule({
  imports: [
    BrowserModule,
    NprogressModule
  ],
  providers: [
    PlatformService,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
