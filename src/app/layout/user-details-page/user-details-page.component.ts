import { Component, OnInit } from '@angular/core';

import { Column } from 'src/app/core/interfaces/column';
import { Element } from '../../core/interfaces/element';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss'],
})
export class UserDetailsPageComponent implements OnInit {
  indexValue: number = 0;
  tableColumns: any;
  tableData: any;

  firstTableColumns: Array<Column> = [
    {
      columnDef: 'position',
      header: 'Position',
      cell: (element: Record<string, any>) => `${element['position']}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Record<string, any>) => `${element['name']}`,
      isLink: true,
      url: 'abc',
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (element: Record<string, any>) => `${element['weight']}`,
    },
    {
      columnDef: 'symbol',
      header: 'Symbol',
      cell: (element: Record<string, any>) => `${element['symbol']}`,
    },
  ];

  firstTableData: Array<Element> = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];

  secondTableColumns: Array<Column> = [
    {
      columnDef: 'position',
      header: 'Position',
      cell: (element: Record<string, any>) => `${element['position']}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Record<string, any>) => `${element['name']}`,
      isLink: true,
      url: 'abc',
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (element: Record<string, any>) => `${element['weight']}`,
    },
  ];

  secondTableData: Array<Element> = [
    { position: 1, name: 'Hydrogen', weight: 1.0079 },
    { position: 2, name: 'Helium', weight: 4.0026 },
    { position: 3, name: 'Lithium', weight: 6.941 },
    { position: 4, name: 'Beryllium', weight: 9.0122 },
    { position: 5, name: 'Boron', weight: 10.811 },
    { position: 6, name: 'Carbon', weight: 12.0107 },
    { position: 7, name: 'Nitrogen', weight: 14.0067 },
    { position: 8, name: 'Oxygen', weight: 15.9994 },
    { position: 9, name: 'Fluorine', weight: 18.9984 },
    { position: 10, name: 'Neon', weight: 20.1797 },
    { position: 11, name: 'Sodium', weight: 22.9897 },
    { position: 12, name: 'Magnesium', weight: 24.305 },
    { position: 13, name: 'Aluminum', weight: 26.9815 },
    { position: 14, name: 'Silicon', weight: 28.0855 },
    { position: 15, name: 'Phosphorus', weight: 30.9738 },
    { position: 16, name: 'Sulfur', weight: 32.065 },
    { position: 17, name: 'Chlorine', weight: 35.453 },
    { position: 18, name: 'Argon', weight: 39.948 },
    { position: 19, name: 'Potassium', weight: 39.0983 },
    { position: 20, name: 'Calcium', weight: 40.078 },
  ];

  thirdTableColumns: Array<Column> = [
    {
      columnDef: 'position',
      header: 'Position',
      cell: (element: Record<string, any>) => `${element['position']}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Record<string, any>) => `${element['name']}`,
      isLink: true,
      url: 'abc',
    },
  ];

  thirdTableData: Array<Element> = [
    { position: 1, name: 'Hydrogen' },
    { position: 2, name: 'Helium' },
    { position: 3, name: 'Lithium' },
    { position: 4, name: 'Beryllium' },
    { position: 5, name: 'Boron' },
    { position: 6, name: 'Carbon' },
    { position: 7, name: 'Nitrogen' },
    { position: 8, name: 'Oxygen' },
    { position: 9, name: 'Fluorine' },
    { position: 10, name: 'Neon' },
    { position: 11, name: 'Sodium' },
    { position: 12, name: 'Magnesium' },
    { position: 13, name: 'Aluminum' },
    { position: 14, name: 'Silicon' },
    { position: 15, name: 'Phosphorus' },
    { position: 16, name: 'Sulfur' },
    { position: 17, name: 'Chlorine' },
    { position: 18, name: 'Argon' },
    { position: 19, name: 'Potassium' },
    { position: 20, name: 'Calcium' },
  ];

  firstTableView() {
    this.tableColumns = this.firstTableColumns;
    this.tableData = this.firstTableData;
  }

  secondTableView() {
    this.tableColumns = this.secondTableColumns;
    this.tableData = this.secondTableData;
  }

  thirdTableView() {
    this.tableColumns = this.thirdTableColumns;
    this.tableData = this.thirdTableData;
  }

  ngOnInit() {
    this.tableColumns = this.firstTableColumns;
    this.tableData = this.firstTableData;
  }
}
