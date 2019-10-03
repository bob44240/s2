import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


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



// export interface DataTableItem {
//   name: string;
//   id: number;
// }

export class DataTableDataSource extends DataSource<AccessLevels> {
  data: AccessLevels[] = access_level_data;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AccessLevels[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
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
  private getPagedData(data: AccessLevels[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AccessLevels[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

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



// // TODO: replace this with real data from your application
// const EXAMPLE_DATA: DataTableItem[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
//   {id: 3, name: 'Lithium'},
//   {id: 4, name: 'Beryllium'},
//   {id: 5, name: 'Boron'},
//   {id: 6, name: 'Carbon'},
//   {id: 7, name: 'Nitrogen'},
//   {id: 8, name: 'Oxygen'},
//   {id: 9, name: 'Fluorine'},
//   {id: 10, name: 'Neon'},
//   {id: 11, name: 'Sodium'},
//   {id: 12, name: 'Magnesium'},
//   {id: 13, name: 'Aluminum'},
//   {id: 14, name: 'Silicon'},
//   {id: 15, name: 'Phosphorus'},
//   {id: 16, name: 'Sulfur'},
//   {id: 17, name: 'Chlorine'},
//   {id: 18, name: 'Argon'},
//   {id: 19, name: 'Potassium'},
//   {id: 20, name: 'Calcium'},
// ];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */