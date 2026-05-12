import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SharedHttpErrorService} from '../../services/shared-http-error.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-error-message',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent implements OnInit {
  isVisible$: Observable<boolean>;
  readonly defaultErrorMessage = 'The server encountered an error. Please try reloading the data.';
  errorMessage: string = '';
  constructor(private sharedHttpErrorService: SharedHttpErrorService) {}

  ngOnInit(): void {
    this.isVisible$ = this.sharedHttpErrorService.isErrorComponentVisible();
    this.sharedHttpErrorService.errorMessageStr$.subscribe( value => this.errorMessage = value || this.defaultErrorMessage);

    this.sharedHttpErrorService.retryRequest().subscribe(response => {
      if (response) {
        console.log('Request retried successfully:', response);
        this.sharedHttpErrorService.hideErrorComponent(); // Hide the error component after retry succeeds
      } else {
        console.log('Retry failed.');
      }
    });
  }

  retry() {
    this.sharedHttpErrorService.retryFailedRequest();
  }
}

