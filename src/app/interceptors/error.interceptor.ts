import { HttpRequest, HttpResponse, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private router: Router) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
    //         switch (err.status) {
    //             case 401:
    //                 this.toastr.error  ("Some message", "Warning!"); {
    //                 }
    //                 break;
    //             case 400:
    //                 const message = Object.keys(err.error.errors)
    //                     .map(e => err.error.errors[e])
    //                     .join('\n');
    //                 this.toastr.error(message, "Warning!");
    //                 break;
    //         }
    //         return throwError(err);
    //     }));
    // }
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req).pipe(catchError(err => {
            const message = err.error.message;

            switch(err.status) {
                case 401:
                    this.toastr.error(message, "Warning!");
                    break;
                case 400:
                    this.toastr.error(Object.keys(err.error.errors).map(a => err.error.errors[a]).join('\n'), "Warning!");
                    break;  
            }
            return throwError(err);
        }));
    }




}