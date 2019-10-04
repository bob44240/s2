import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CustomMaterialModule} from "./material.module";
import {MatInputModule, MatTableModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { S2MainDisplayComponent } from './s2-main-display/s2-main-display.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { S2DataTableComponent } from './s2-data-table/s2-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    S2MainDisplayComponent,
    DataTableComponent,
    S2DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
