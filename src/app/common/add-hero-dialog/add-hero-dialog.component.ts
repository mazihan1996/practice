import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-add-hero-dialog',
  templateUrl: './add-hero-dialog.component.html',
  styleUrls: ['./add-hero-dialog.component.scss']
})
export class AddHeroDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddHeroDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      organization: [null, Validators.required],
      status: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      degree: null,
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    if (this.form.valid) {
     this.dialogRef.close(this.form.value);
     this.snackBar.open(`User ${this.form.value['name']} suceesfully created!`, 'OK',
                        {duration: 2000, verticalPosition: 'top'});
    }

    if (!this.form.value.status) {
      this.snackBar.open(`Status is required. Please select your status.`, 'OK',
                        {verticalPosition: 'top'});
    }
  }
}
