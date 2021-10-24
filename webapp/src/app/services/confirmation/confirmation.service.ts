import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { IConfirmation } from 'src/app/shared/confirmation-dialog/confirmation-model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private _dialog: MatDialog) {}

  public async confirm(data: IConfirmation): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._dialog
        .open(ConfirmationDialogComponent, {
          data,
        })
        .afterClosed()
        .subscribe((res) => {
          resolve(res);
        });
    });
  }
}
