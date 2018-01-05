import { ModuleWithProviders, Injectable } from '@angular/core';
import { NgModule } from '@angular/core';

import { NprogressComponent } from './nprogress.component';
import { NprogressService } from './nprogress.service';

export interface NprogressModuleConfig {
  /** Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: ease and 200) */
  easing?: string;
  /** Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: ease and 200) */
  speed?: number;
  /** Changes the minimum percentage used upon starting. (default: 0.08) */
  minimum?: number;
  /** Turn off the automatic incrementing behavior by setting this to false. (default: true) */
  trickle?: boolean;
  /** Adjust how often to trickle/increment, in ms. */
  trickleSpeed?: number;
  /** Turn off loading spinner by setting it to false. (default: true) */
  showSpinner?: boolean;
  /** If this option is enabled, nporgress will automatically appears on each NavigationStart and disappear on NavigationEnd/NavigationError. (default: true)*/
  subscribeToRouter?: boolean;

  /** HEX color */
  color: string;
};

export const NprogressModuleConfig = {
  showSpinner: false,
  trickleSpeed: 200,
  easing: 'ease',
  speed: 500,
  subscribeToRouter: true,
  color: '00ff00',
};

@NgModule({
  declarations: [
    NprogressComponent
  ],
  providers: [
    NprogressService,
    { provide: 'NprogressModuleConfig', useValue: NprogressModuleConfig }
  ],
  exports: [
    NprogressComponent,
  ]
})
export class NprogressModule {
  static config(config: NprogressModuleConfig): ModuleWithProviders {
    return {
      ngModule: NprogressModule,
      providers: [
        { provide: 'NprogressModuleConfig', useValue: config }
      ]
    };
  }
}
