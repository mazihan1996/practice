import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// routing
import { HeroDetailRoutingModule } from './hero-detail-routing.module';

// component
import { HeroDetailComponent } from './hero-detail.component';


// angular module
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeroDetailComponent, ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeroDetailRoutingModule,

    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class HeroDetailModule { }
