import { Inject, Injectable, Injector } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { PlatformService } from '@betadigitalproduction/ngx-platform-service';

import { NprogressModuleConfig } from './nprogress.module';

declare const require: any;

@Injectable()
export class NprogressService {
  nprogress: any;

  counts = 0;
  isInited = false;

  constructor(
    private platform: PlatformService,
    @Inject('NprogressModuleConfig') private config: NprogressModuleConfig,
    private injector: Injector,
  ) {
    if (this.config.subscribeToRouter) {
      // If router exists in DI, then, subscribe to router;
      try {
        const router = <Router>this.injector.get('Router');
        router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.start();
          }
          if (event instanceof NavigationEnd) {
            this.end();
          }
          if (event instanceof NavigationError) {
            this.end();
          }
          if (event instanceof NavigationCancel) {
            this.end();
          }
        });
      } catch (e) {
        console.log('\'@angular/router\' is not found in DI, skip router events subscription');
      }
    }
  }

  init() {
    this.platform.runExternal(() => {
      this.nprogress = require('nprogress');
      window['nprogress'] = this.nprogress;
      if (document.getElementById('progress-container') === null) {
        throw 'Nprogress DOM element not exists, add NprogressComponent into document tree';
      }
      this.nprogress.configure({
        parent: '#progress-container',
        ...this.config,
      });

      this.isInited = true;
    });

  }

  start() {
    this.platform.runExternal(() => {
      if (!this.isInited) {
        this.init();
      }
      if (!this.nprogress.isRendered()) {
        this.nprogress.render();
      }

      if (this.counts === 0) {
        this.nprogress.start();
      }

      this.counts++;
    });
  }

  end() {
    this.platform.runExternal(() => {
      this.counts--;
      if (this.counts === 0) {
        setTimeout(() => {
          this.nprogress.done();
        }, 200);
      } else {
        this.nprogress.inc();
      }
    });
  }
}
