import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideEcharts} from 'ngx-echarts';
import {provideToastr} from 'ngx-toastr';
import {DatePipe, I18nPluralPipe} from '@angular/common';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarUtils,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideEcharts(),
    DatePipe,
    CalendarDateFormatter,
    CalendarUtils,
    CalendarA11y,
    I18nPluralPipe,
    CalendarEventTitleFormatter,
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
  ]
};
