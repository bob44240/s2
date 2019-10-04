import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { 
  MatSort, 
  MatPaginator, 
  MatTableDataSource } from '@angular/material';
import { S2DataTableDataSource, S2DataTableItem } from './s2-data-table-datasource';
export interface Readers {
  id: number;
  typeId: number;
  name: string;
}

export interface ReaderTypes {
  id: number;
  name: string;
}

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

export class s2RowItem {
  constructor(
    public id:number,
    public name: string,
    public description: string,
    public readers: string
  ) {}
}

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
  data: S2DataTableItem[] = S2_DATA;
  readers:Readers[]= readers_data;
  readerTypes:ReaderTypes[] = readerTypes_data;


  readerIdLookup: Map<number, any> = new Map<number, any>();
  typeIdLookup: Map<number, string>= new Map<number, string>();

   //dataSource: S2DataTableDataSource;
  dataSource = new MatTableDataSource<S2DataTableItem>(this.data);
  public readersList;
  public s2Row:s2RowItem;
  public readersSelect;
  public readersSelect2;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','readerType','readers'];
constructor() {
  this.buildReaderIdLookup();
  this.updateLookups(this.data)
  this.readersList = this.readers;

}
  ngOnInit() {
    let temp = S2_DATA[0];
    this.s2Row = new s2RowItem(temp.id,temp.name, temp.Description, temp.readers);
    this.readersSelect = {id: 12, typeId: 1, name: "Reader F3"};
    this.readersSelect2 = "Reader F3"
  }

  select(xreader){}

  save(action:boolean) {
    if (action) {
        let t = this.s2Row;
        let index = t.id-1
        this.dataSource.data[index].Description = this.s2Row.description;
        this.dataSource.data[index].name = this.s2Row.name;
    } else {
      this.readersSelect = {id: 12, typeId: 1, name: "Reader F3"};
    }
  }
  onRowClicked(row) {
    this.s2Row.name = row.name;
    this.s2Row.description = row.Description;
    this.s2Row.id = row.id;
    this.s2Row.readers = row.readers;
}
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  updateLookups(data) {
    data.forEach(item => {
      let temp = this.readerIdLookup.get(item.readerId);
      item.readers = temp.name;
      let readerType = this.typeIdLookup.get(temp.typeId);
      item.readerType = this.typeIdLookup.get(temp.typeId);
    })
  }
  
  buildReaderIdLookup(){
    this.readerTypes.forEach(item => {
      this.typeIdLookup.set(item.id,item.name)
    })
    this.readers.forEach(item => {
      this.readerIdLookup.set(item.id,item)
    })

  }
   
}
