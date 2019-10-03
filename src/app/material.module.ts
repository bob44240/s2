
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule],
  exports: [CommonModule, MatToolbarModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule],
})
export class CustomMaterialModule { }