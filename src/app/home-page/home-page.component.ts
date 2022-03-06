import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { UserModel } from './user-dashboard.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  formValue!: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });

    this.getUsers();
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
    this.userModelObj.salary = this.formValue.value.salary;

    this.api.postUser(this.userModelObj).subscribe(
      (res) => {
        alert('User Added Successfully.');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }

  getUsers() {
    this.api.getUser().subscribe((res) => {
      this.userData = res;
    });
  }

  deleteUser(row: any) {
    this.api.deleteUser(row.id).subscribe((res) => {
      alert('User Deleted!!!');
      this.getUsers();
    });
  }

  editUser(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateUser() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.salary = this.formValue.value.salary;

    this.api
      .updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe((res) => {
        alert('Data Updated Successfully!!!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      });
  }
}

// ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//       tableRowArray: this.formBuilder.array([this.createTableRow()]),
//     });
//     this.userForm.get('isActive')?.valueChanges.subscribe((val) => {
//       console.log(typeof val);
//     });

//     this.formControls = this.userForm.get('tableRowArray');
//   }

//   private createTableRow(): FormGroup {
//     return this.formBuilder.group({
//       id: new FormControl(),
//       name: new FormControl(null, {
//         validators: [Validators.required, Validators.maxLength(50)],
//       }),
//       email: new FormControl(null, {
//         validators: [Validators.required, Validators.email],
//       }),
//       age: new FormControl(null, {
//         validators: [Validators.required],
//       }),
//       isActive: new FormControl({ value: false, disabled: false }),
//     });
//   }

//   get tableRowArray(): FormArray {
//     return this.userForm.controls['tableRowArray'] as FormArray;

//     // return this.userForm.get('tableRowArray') as FormArray;
//   }

//   updateUserInfo(userAt: number) {
//     // if() {}

//     this.userForm.valueChanges.subscribe((val) => {
//       let tempStr = Object.values(val).flat();
//       tempStr.map((ele) => console.log(ele));
//     });
//   }

//   saveUserInfo(userAt: number) {
//     this.usersArray.push(this.tableRowArray.value[userAt]);
//     console.log(this.usersArray);
//     this.updateUserInfo(userAt);

//     // this.updateFlag = true;
//   }

//   addNewUser(): void {
//     this.tableRowArray.push(this.createTableRow());
//   }

//   onDeleteRow(userAt: number): void {
//     this.tableRowArray.removeAt(userAt);
//     // this.usersArray.find()
//     // (this.tableRowArray.value[userAt]);
//   }
