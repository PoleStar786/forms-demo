import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserModel } from '../../core/models/user-dashboard.model';

import { ApiService } from '../../shared/shared-services/apis/api.service';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { interval, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { first } from 'rxjs/operators';

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
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: SnackbarAlertService,
    public dialogBox: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

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

  postUserDetails() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.age = this.formValue.value.age;

    this.api.postUser(this.userModelObj).subscribe(
      (res) => {
        this.stateAlert = 'UAS'; // UC: User Added Successfully
        this._snackBar.openSnackBar(this.stateAlert);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      },
      (err) => {
        this.stateAlert = 'SWW'; // Something went wrong
        this._snackBar.openSnackBar(this.stateAlert);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      }
    );
  }

  getUsers() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
      this.dataSource = new MatTableDataSource<UserModel>(this.userData);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe((res) => {
      this.stateAlert = 'UD'; // User Deleted
      this._snackBar.openSnackBar(this.stateAlert);
      this.getUsers();
    });
  }

  openConfirmationDialog(row: UserModel) {
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

  editUser(row: UserModel) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;

    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
  }

  updateUser() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.age = this.formValue.value.age;

    this.api
      .updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe((res) => {
        this.stateAlert = 'DUS'; // Data Updated Successfully
        this._snackBar.openSnackBar(this.stateAlert);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      });
  }
}
