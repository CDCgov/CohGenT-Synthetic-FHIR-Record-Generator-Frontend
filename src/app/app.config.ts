import {
  ApplicationConfig, inject, provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {ConfigService} from './config/config.service';
import {httpErrorInterceptor} from './shared/interceptors/http-error.interceptor';

const initializeAppConfig = () => {
  const configService = inject(ConfigService);
  return configService.loadConfig();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([httpErrorInterceptor])),
    provideAppInitializer(initializeAppConfig)
  ]
};
