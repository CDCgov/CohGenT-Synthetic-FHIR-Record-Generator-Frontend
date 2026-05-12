import {Injectable, isDevMode} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {catchError, map, of} from "rxjs";
import packageInfo from "../../../package.json"
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  defaultConfigPath = '../../../assets/config/config.json';
  localConfigPath = '../../../assets/config/local-config.json';
  config: Config | undefined;

  private http: HttpClient
  packageInfo = packageInfo;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
    this.loadConfig();
  }

  loadConfig() {
    let configPath = this.defaultConfigPath;
    if(isDevMode()){
      configPath = this.localConfigPath;
    }

    return this.http.get<Config>(configPath).pipe(
      map(config => {
        config.version = "v" + this.packageInfo.version;
        this.config = config;
        return true;
      }),
      catchError(error => {
        console.error("No configuration file found. If in dev mode please verify the existence of local-config.json file")
        this.config = new Config();
        return of(false);
      })
    )
  }
}
