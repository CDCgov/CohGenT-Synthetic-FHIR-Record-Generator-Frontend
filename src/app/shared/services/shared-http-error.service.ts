import {Injectable} from '@angular/core';
import {HttpRequest, HttpClient} from '@angular/common/http';
import {Subject, Observable, of} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedHttpErrorService {
  private failedRequest: HttpRequest<any> | null = null;
  private retrySubject = new Subject<void>();
  private errorComponentVisible = new Subject<boolean>();
  private errorMessageStr: Subject<string> = new Subject();
  public errorMessageStr$: Observable<string> = this.errorMessageStr.asObservable();

  constructor(private http: HttpClient) {
  }

  storeFailedRequest(request: HttpRequest<any>) {
    this.failedRequest = request;
  }

  setErrorMessage(message: string){
    this.errorMessageStr.next(message);
  }

  showErrorComponent() {
    this.errorComponentVisible.next(true);
  }

  hideErrorComponent() {
    this.errorComponentVisible.next(false);
  }

  isErrorComponentVisible(): Observable<boolean> {
    return this.errorComponentVisible.asObservable();
  }

  retryFailedRequest() {
    if (this.failedRequest) {
      this.retrySubject.next();  // Trigger the retry subject
    }
  }

  retryRequest(): Observable<any> {
    this.errorMessageStr.next('');
    return this.retrySubject.pipe(
      switchMap(() => {
        if (this.failedRequest) {
          const retryRequest = this.failedRequest; // Store the failed request locally
          this.failedRequest = null; // Reset the failed request for subsequent retries
          return this.http.request(retryRequest).pipe(
            catchError(error => {
              // Handle error again if the retry fails, but don't complete the stream
              this.storeFailedRequest(retryRequest);  // Re-store the request if retry fails
              this.showErrorComponent();  // Show error component again
              return of(null);  // Return null or empty observable on error
            })
          );
        }
        return of(null);  // Return null if no failed request
      })
    );
  }
}
