import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  form: FormGroup;
  prevForm: FormGroup;
  id: number;
  index: number;
  name: string;
  org: string;
  status: string;
  foodList: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dashBoardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.foodList = ['Apple', 'Banana', 'Carrot', 'Dragon Fruit', 'Eggplant'];
    this.initForm();

    this.route.params.subscribe(res => {
      this.route.queryParams.subscribe(response => {
        this.form.patchValue({
          id: parseInt(res.id, 10),
          name: response.name,
          organization: response.org,
          status: response.status
        });
        this.status = response.status;
        this.index = response.index;
      });
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      id: null,
      name: null,
      organization: null,
      food: null,
      status: null,
    });
  }

  cancel() {
    this.router.navigate(['dashboard'], {queryParams: {index: this.index}});
  }

  save() {
    if (this.form.valid) {
      this.dashBoardService.updateHero(this.form.value).subscribe();
      this.snackbar.open('Form Successfully Saved!', 'OK', { duration: 2000, verticalPosition: 'top' });
      this.router.navigate(['dashboard'], {queryParams: {index: this.index}});
    }
  }

  radioChange(event) {
    this.form.value.status = event.value;
  }

}
