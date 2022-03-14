import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserModel } from '../../core/models/user-dashboard.model';

import { ApiService } from '../../shared/shared-services/apis/api.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditFormComponent } from '../home-page/edit-form/edit-form.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// import { interval, of } from 'rxjs';
// import { map, take } from 'rxjs/operators';
// import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  formValue: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData: any;
  showAdd: boolean;
  showUpdate: boolean;
  stateAlert: string;
  loading: boolean = true;
  cantDelete: number;
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'age',
    'actions',
  ];
  dataSource: any;

  constructor(
    private api: ApiService,
    private _snackBar: SnackbarAlertService,
    public dialogBox: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getUsers();

    /* Operators */
    /* pipeable operators */
    // example: map
    /* of(1, 2, 3)
      .pipe(map((x) => x * x))
      .subscribe((v) => console.log(`Value: ${v}`));

    // example: first
    of(1, 2, 3)
      .pipe(first()) // last also exists
      .subscribe((v) => console.log(`Value: ${v}`));

    // pipeable operators 
    // example: interval
    const obl = interval(1000);
    const takeFourNumbers = obl.pipe(take(4));
    takeFourNumbers.subscribe((x) => console.log(`Next: ${x}`)); */
  }

  toggleButton() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getUsers() {
    this.api.getUser().subscribe({
      next: (res) => {
        this.userData = res;
        this.dataSource = new MatTableDataSource<UserModel>(this.userData);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: () => {
        'Something went wrong!';
      },
    });
  }

  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        this.stateAlert = 'UD'; // User Deleted
        this._snackBar.openSnackBar(this.stateAlert);
        this.getUsers();
      },
      error: () => {
        'Error occured when deleting User!';
      },
    });
  }

  openConfirmationDialog(row: UserModel) {
    this.cantDelete = JSON.parse(sessionStorage.getItem('cantDelete') || '{}');
    if (row.id === this.cantDelete) {
      this.stateAlert = 'CDU'; // User Deleted
      this._snackBar.openSnackBar(this.stateAlert);
    } else {
      this.dialogRef = this.dialogBox.open(DeleteConfirmationDialogComponent, {
        disableClose: false,
      });
      this.dialogRef.componentInstance.confirmMessage =
        'Are you sure you want to delete? 🤨';

      this.dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.deleteUser(row.id);
        }
        this.dialogRef.close();
      });
    }
  }

  editUser(row: UserModel) {
    this.dialogBox.open(EditFormComponent, {
      width: '50%',
      data: row,
    });
    this.userModelObj.id = row.id;
  }
}
