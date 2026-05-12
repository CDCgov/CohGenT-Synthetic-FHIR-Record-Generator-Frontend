import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentHandlerService {
  config: Config;

  constructor(private configService: ConfigService) {
     this.config = this.configService.config;
  }

  getBaseApiURL(): string {
    let baseApiUrl = this.config.api;
    if (!baseApiUrl.endsWith("/")) {
      baseApiUrl = baseApiUrl.concat("/");
    }
    return baseApiUrl;
  }
}
