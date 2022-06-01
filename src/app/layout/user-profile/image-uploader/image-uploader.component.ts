import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackbarAlertService } from 'src/app/shared/shared-services/snackbar-alert/snackbar-alert.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;

  loggedInUser: string = localStorage.getItem('loggedInUser') || '{}';
  loggedInUserID: number = JSON.parse(this.loggedInUser).id;

  file_data: any = '';
  file = new FormControl('');
  stateAlert: string;

  constructor(
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: SnackbarAlertService
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      profilePicture: [''],
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileUploadForm.get('profilePicture')?.setValue(file);
  }

  onFormSubmit() {
    if (!this.fileUploadForm.get('profilePicture')?.value) {
      this.stateAlert = 'PUI';
      this._snackBar.openSnackBar(this.stateAlert);
      return false;
    }

    const formData = new FormData();
    formData.append(
      'profilePicture',
      this.fileUploadForm.get('profilePicture')?.value
    );

    this.http.post<any>('http://localhost:4300/uploadfile', formData).subscribe(
      (response) => {
        // console.log(response.uploadedFile.filename);
        if (response.statusCode === 200) {
          // Show confirm message
          this.stateAlert = 'IOS';
          this._snackBar.openSnackBar(this.stateAlert);

          // Reset the file input
          this.uploadFileInput.nativeElement.value = '';
        }
      },
      (er) => {
        // console.log(er);
        this.stateAlert =
          er.error.error === 'File too large' ? 'FTL' : er.error.error;
        this._snackBar.openSnackBar(this.stateAlert);
      }
    );
  }
}
