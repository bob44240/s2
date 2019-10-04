import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { 
  MatSort, 
  MatPaginator, 
  MatTableDataSource } from '@angular/material';
import { S2DataTableDataSource, S2DataTableItem } from './s2-data-table-datasource';

var S2_DATA: S2DataTableItem[] = [
  { id: 1, name: "Morning 9:00 - 10:00", readerId: 10, Description: "Morning Front door Access", readerType:" ", readers:""},
  { id: 2,name: "Morning 10:00 - 11:00",readerId: 11,Description: "Back door", readerType:" ", readers:""},
  {  id: 3, name: "Morning 11:00 - 12:00",readerId: 12,Description: "Side door", readerType:"fred", readers:""},
  {  id: 4,name: "Evening 3:00 - 4:00",readerId: 13,Description: "Fire pole", readerType:"fred", readers:""},
  { id: 5,name: "Evening5:00 - 6:00",readerId: 14, Description: "Window", readerType:"fred", readers:"" },
  {  id: 6, name: "All Day Elevator",readerId: 15,Description: "Fire escape", readerType:"fred", readers:""},
  {  id: 7, name: "All Day Back Door",readerId: 16,Description: "Helipad", readerType:"fred", readers:""},
  { id: 8, name: "All Day Supply Door",readerId: 17,  Description: "Submarine", readerType:"fred", readers:""}
]

@Component({
  selector: 'app-s2-data-table',
  templateUrl: './s2-data-table.component.html',
  styleUrls: ['./s2-data-table.component.scss']
})
export class S2DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<S2DataTableItem>;
  
   dataSource: S2DataTableDataSource;
  //dataSource = new MatTableDataSource<S2DataTableItem>(S2_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','readerType','readers'];

  ngOnInit() {
    this.dataSource = new S2DataTableDataSource();
  }
  applyFilter(filterValue: string) {
    console.log(filterValue)
    console.log(this.dataSource)
    let temp = this.dataSource.data.filter(item => {
      console.log(item.name, item.name.indexOf(filterValue))
      return item.name.indexOf(filterValue)>-1
    })
    console.log(temp)
    this.dataSource.data=temp;
    console.log(this.dataSource)
    this.table.dataSource = this.dataSource;
//    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onKeyUp(){
    console.log("DDD");
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
