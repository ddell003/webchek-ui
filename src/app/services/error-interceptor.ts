import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "../error/error.component";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog){}

  intercept(req: HttpRequest<any>, next:HttpHandler) {

    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        console.log("error", error.error)
        let errorMessage = "An unknown error occured!!!!";
        if(error.error){
          if(error.error instanceof Array){
            errorMessage = error.error[0];
          }
          else{
            errorMessage = error.error;
          }
        }

        this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
        return throwError(Error);
      })
    );

  }
}
