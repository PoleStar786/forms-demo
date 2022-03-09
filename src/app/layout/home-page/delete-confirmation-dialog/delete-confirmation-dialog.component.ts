import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  public confirmMessage!: string;

  ngOnInit(): void {}
}
