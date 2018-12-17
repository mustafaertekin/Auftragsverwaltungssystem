import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable, of, from} from 'rxjs';
import { mergeMap, map, tap} from 'rxjs/operators';
import { TokenService } from './token.service';
import { GeneralErrorComponent } from '@avs-ecosystem/modules/shared/general-error-message/general-error.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(tokenService: TokenService, public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( TokenService.getToken()) {
      const token = TokenService.getToken();

      req = req.clone({
          setHeaders: {
            'Content-Type' : 'application/json; charset=utf-8',
            'Accept'       : 'application/json',
            'Authorization': `Bearer ${token.access_token}`,
          },
        });
    }

    if (req.method === 'DELETE') {
      return this.askOnceMoreBeforeDelete()
      .pipe(
        mergeMap(result => {
          if (result.approved === true) {
            return next.handle(req);
          }
          const request = new HttpRequest('DELETE', 'dontdelete');
          return next.handle(request);
        }
        ));
    }
    return next.handle(req);
  }

  askOnceMoreBeforeDelete() {
      const dialogRef = this.dialog.open(GeneralErrorComponent, {
        width: '250px',
        data: {}
      });

      return dialogRef.afterClosed();
  }
}


