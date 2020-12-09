import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, action: string = '', config: MatSnackBarConfig) {
    this.snackBar.open(msg, action, {
      duration: config.duration,
      horizontalPosition: config.horizontalPosition,
      verticalPosition: config.verticalPosition,
    });
  }

}
