import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss'
})
export class DeleteDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteDialog>);
  readonly data = inject<DeleteState>(MAT_DIALOG_DATA);
  // readonly animal = model (this.data.animal);

  close(): void {
    this.dialogRef.close();
  }
}

export enum  DeleteState{
  Yes,
  No
}
