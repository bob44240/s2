import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';

export interface AccessLevels {
  id: number;
  name: string;
  readerId: number;
  Description: string;
  other: string;
}

export interface Readers {
  id: number;
  typeId: number;
  name: string;
}

export interface ReaderTypes {
  id: number;
  name: string;
}

var access_level_data: AccessLevels[] = [
{ id: 1, name: "Morning 9:00 - 10:00", readerId: 10, Description: "Morning Front door Access", other:"fred"},
{ id: 2,name: "Morning 10:00 - 11:00",readerId: 11,Description: "Back door", other:"fred"},
{  id: 3, name: "Morning 11:00 - 12:00",readerId: 12,Description: "Side door", other:"fred"},
{  id: 4,name: "Evening 3:00 - 4:00",readerId: 13,Description: "Fire pole", other:"fred"},
{ id: 5,name: "Evening5:00 - 6:00",readerId: 14, Description: "Window", other:"fred" },
{  id: 6, name: "All Day Elevator",readerId: 15,Description: "Fire escape", other:"fred"},
{  id: 7, name: "All Day Back Door",readerId: 16,Description: "Helipad", other:"fred"},
{ id: 8, name: "All Day Supply Door",readerId: 17,  Description: "Submarine", other:"fred"}
]

var readers_data: Readers[] = [
  { id: 10,typeId: 1,name: "Reader F1"},
  { id: 11,  typeId: 1,name: "Reader F2"},
  { id: 12,  typeId: 1,  name: "Reader F3"},
  { id: 13, typeId: 1,name: "Reader F4"},
  { id: 14,  typeId: 1,name: "Reader F5"},
  { id: 15,typeId: 2,name: "Reader E"},
  { id: 16,typeId: 3,name: "Reader B"},
  { id: 17,typeId: 4,name: "Reader S"}
]

var readerTypes_data: ReaderTypes[] = [
{ id: 1,  name: "Front Door"},
{ id: 2, name: "Elevator Door"},
{  id: 3, name: "Back Door"},
{  id: 4, name: "Supply Door"}
]

@Component({
  selector: 'app-s2-main-display',
  templateUrl: './s2-main-display.component.html',
  styleUrls: ['./s2-main-display.component.scss']
})
export class S2MainDisplayComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = [ 'name', 'Description', 'other'];
  dataSource = new MatTableDataSource(access_level_data);

  // displayedColumns = ['position', 'firstName', 'lastName', 'email'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  ngOnInit() {
    console.log(this.dataSource)
  }
}
