import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  tempo: any;
  constructor(
    private api: ApiService,
    private _snackBar: SnackbarAlertService,
    public dialogBox: MatDialog
  ) {}

  formValue: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData: any;
  showAdd: boolean;
  showUpdate: boolean;
  stateAlert: string;
  loading: boolean = true;
  cantDelete: number;
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  loggedInUser: string = localStorage.getItem('loggedInUser') || '{}';
  loggedInUserID: number = JSON.parse(this.loggedInUser).id;
  isChecked: boolean;
  uData: UserModel[] = [];
  crewArr = [];

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.crewArr = JSON.parse(this.loggedInUser).crew;

    this.getUsers();
    this.api.toggleView$.subscribe((v) => (this.isChecked = v));

    this.api.addCrew$.subscribe((res) => {
      this.getUsers();
      this.crewArr = res.crew;
    });

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

  getUsers() {
    this.api.getSubUser().subscribe({
      // before... it was getUser(),
      next: (res) => {
        this.userData = res;
        this.uData = [];

        this.crewArr.forEach((c) => {
          this.userData.filter((v: UserModel) => {
            if (v.id === c) {
              this.uData.push(v);
            }
          });
        });

        this.userData = this.uData;
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
    this.api.deleteSubUser(id).subscribe({
      next: (_res) => {
        const numID = this.crewArr.findIndex((num) => num === id);

        if (numID > -1) {
          this.crewArr.splice(numID, 1);
        }

        const tempUser = JSON.parse(this.loggedInUser);
        tempUser['crew'] = this.crewArr;
        this.crewArr = this.crewArr;

        localStorage.setItem('loggedInUser', JSON.stringify(tempUser));

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
    // this.cantDelete = this.loggedInUserID;
    // if (row.id === this.cantDelete) {
    //   this.stateAlert = 'CDU'; // Cannot Delete Current User
    //   this._snackBar.openSnackBar(this.stateAlert);
    // } else {
    this.dialogRef = this.dialogBox.open(DeleteConfirmationDialogComponent, {
      width: '45%',
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
    // }
  }

  editUser(row: UserModel) {
    this.dialogBox.open(EditFormComponent, {
      width: 'auto',
      data: row,
    });
    this.userModelObj.id = row.id;
  }
}
