import {inject} from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpContextToken, HttpInterceptorFn, HttpHandlerFn
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SharedHttpErrorService} from '../services/shared-http-error.service';


export const BYPASS_INTERCEPTOR = new HttpContextToken<boolean>(() => false);

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const sharedService = inject(SharedHttpErrorService);

  // Logic for hiding error component
  sharedService.hideErrorComponent();

  // Check if this request should bypass the interceptor
  if (req.context.get(BYPASS_INTERCEPTOR)) {
    // Bypass interception and forward the original request
    return next(req);
  }

  // Handle the request and catch errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      sharedService.storeFailedRequest(req); // Store the failed request
      sharedService.showErrorComponent(); // Show the error UI
      return throwError(() => error); // Propagate the error
    })
  );
};
