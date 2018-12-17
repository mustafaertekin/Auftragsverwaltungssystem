import { Component, OnInit, Input , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'avs-general-error-dialog',
  templateUrl: './general-error.component.html',
  styleUrls: ['./general-error.component.scss']
})
export class GeneralErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GeneralErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    // this.dialogRef.close({});
  }
  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close({approved: false});
  }

  approve() {
    this.dialogRef.close({approved: true});
  }
}
