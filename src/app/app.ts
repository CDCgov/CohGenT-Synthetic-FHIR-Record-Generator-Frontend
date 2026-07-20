import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './layout/header/header/header';
import {ErrorMessageComponent} from './shared/components/error-message/error-message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ErrorMessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'cohort-generator-ui';
}
