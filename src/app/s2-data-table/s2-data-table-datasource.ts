import { DataSource } from '@angular/cdk/collections';
import { 
  MatSort, 
  MatPaginator, 
  MatTableDataSource } from '@angular/material';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface S2DataTableItem {
  id: number;
  name: string;
  readerId: number;
  Description: string;
  readerType: string;
  readers: string;
}

export interface AccessLevels {
  id: number;
  name: string;
  readerId: number;
  Description: string;
  readerType: string;
  readers: string;
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

// var access_level_data: AccessLevels[] = [
// { id: 1, name: "Morning 9:00 - 10:00", readerId: 10, Description: "Morning Front door Access", readerType:" ", readers:""},
// { id: 2,name: "Morning 10:00 - 11:00",readerId: 11,Description: "Back door", readerType:" ", readers:""},
// {  id: 3, name: "Morning 11:00 - 12:00",readerId: 12,Description: "Side door", readerType:"fred", readers:""},
// {  id: 4,name: "Evening 3:00 - 4:00",readerId: 13,Description: "Fire pole", readerType:"fred", readers:""},
// { id: 5,name: "Evening5:00 - 6:00",readerId: 14, Description: "Window", readerType:"fred", readers:"" },
// {  id: 6, name: "All Day Elevator",readerId: 15,Description: "Fire escape", readerType:"fred", readers:""},
// {  id: 7, name: "All Day Back Door",readerId: 16,Description: "Helipad", readerType:"fred", readers:""},
// { id: 8, name: "All Day Supply Door",readerId: 17,  Description: "Submarine", readerType:"fred", readers:""}
// ]



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

/**
 * Data source for the S2DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class S2DataTableDataSource extends MatTableDataSource<S2DataTableItem> {
  data: S2DataTableItem[] = S2_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  readers:Readers[]= readers_data;
  readerTypes:ReaderTypes[] = readerTypes_data;

  //dataSource = new MatTableDataSource<S2DataTableItem[]>(S2_DATA);

  readerIdLookup: Map<number, any> = new Map<number, any>();
  typeIdLookup: Map<number, string>= new Map<number, string>();

  constructor() {
    super();
    console.log('s2d')
    this.buildReaderIdLookup();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<S2DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    console.log('Connect',this.data )

    //Update lookups
    this.updateLookups(this.data)
    console.log('Updated',this.data )
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
updateLookups(data) {
  data.forEach(item => {
   // this.lookupReader(item)
    console.log(item);
    let temp = this.readerIdLookup.get(item.readerId);
    item.readers = temp.name;
    //console.log(this.readerIdLookup);
    // console.log(temp);
    let readerType = this.typeIdLookup.get(temp.typeId);
    //console.log(t2);

    item.readerType = this.typeIdLookup.get(temp.typeId);
  })
  console.log(data);
}

buildReaderIdLookup(){
  // let readerIdLookup: Map<number, any>;
  // let typeIdLookup:Map<number, any>;
  // readerIdLookup = new Map();
  // typeIdLookup = new Map();

  this.readerTypes.forEach(item => {
    this.typeIdLookup.set(item.id,item.name)
  })
  this.readers.forEach(item => {
    console.log(item)
    this.readerIdLookup.set(item.id,item)
  })
  console.log(this.readerIdLookup)
  console.log(this.readerIdLookup.get(10))

  console.log(this.typeIdLookup)
  console.log(this.typeIdLookup.get(4))

}
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: S2DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: S2DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    console.log(this.sort.active)

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
