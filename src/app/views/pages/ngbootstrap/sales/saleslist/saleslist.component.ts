import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Sales } from '../../../models/sales';
import { CommonService } from '../../../Services/common.service';
import { SalesService } from '../../../Services/sales.service';
import { SalesComponent } from '../sales.component';

@Component({
  selector: 'kt-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.scss']
})
export class SaleslistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Sales>();
	displayedColumns: string[] = ['name', 'countryName', 'cityName', 'stateName', 'areaName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _SalesService: SalesService, public dialog: MatDialog, public snackBar: MatSnackBar,
		private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.GetSales();
	}

	async GetSales() {
		this._SalesService.GetSales()
			.subscribe(res => {
				this.dataSource.data = res as Sales[];
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	async AddNew() {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = {};
		this.dialog.open(SalesComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(SalesComponent, dialogconfig);
	}
}




