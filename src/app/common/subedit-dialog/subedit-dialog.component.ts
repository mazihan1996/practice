import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DashboardService } from '../../dashboard/dashboard.service';


@Component({
  selector: 'app-subedit-dialog',
  templateUrl: './subedit-dialog.component.html',
  styleUrls: ['./subedit-dialog.component.scss']
})
export class SubeditDialogComponent implements OnInit {
  form: FormGroup;
  email: string;
  degree: string;
  
  constructor(
    public dialogRef: MatDialogRef<SubeditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.email = this.data.email;
    this.degree = this.data.degree;

    this.form.patchValue({
      email: this.email,
      degree: this.degree,
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      email: null,
      degree: null,
      note: null,
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      const updatedHero = this.data;
      const keys = Object.keys(this.data);

      for (const k of keys) {
        if (k === 'email' || k === 'degree') {
          updatedHero[k] = this.form.value[k];
        }
      }

      this.dashboardService.updateHero(updatedHero);
      this.snackBar.open('Form successfully saved!', 'OK', {duration: 2000, verticalPosition: 'top'});

      this.dialogRef.close();
    }
  }

}
