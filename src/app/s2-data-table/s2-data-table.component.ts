import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { S2DataTableDataSource, S2DataTableItem } from './s2-data-table-datasource';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','readerType','readers'];

  ngOnInit() {
    this.dataSource = new S2DataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
