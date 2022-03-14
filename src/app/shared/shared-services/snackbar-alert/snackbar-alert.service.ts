import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarAlertService {
  alertMessage: string;
  classState: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  alertContent(alertType: string) {
    const alertContentMessage: any = {
      UD: 'User Deleted! ⚠️',
      SS: 'SignUp Successful. 🥳',
      UAS: 'User Added Successfully. 🎉',
      SWW: 'Something went wrong! 👎',
      DUS: 'Data Updated Successfully! 🤖',
      UDE: `User doesn't Exists! 🤖`,
      CDU: 'Oops, cannot delete Logged In User! 🤖',
    };

    const alertContentState: any = {
      UD: 'delete',
      SS: 'success',
      UAS: 'success',
      SWW: 'failure',
      DUS: 'success',
      UDE: 'failure',
      CDU: 'failure',
    };

    return [
      alertContentMessage[alertType] ?? 'none',
      alertContentState[alertType] ?? 'none',
    ];
  }

  openSnackBar(alertCall: string) {
    this.alertMessage = this.alertContent(alertCall)[0];
    this.classState = this.alertContent(alertCall)[1];

    this._snackBar.open(this.alertMessage, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [`${this.classState}-snackbar`],
    });
  }
}
