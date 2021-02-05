import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Profit } from '../../../models/profit';
import { CommonService } from '../../../Services/common.service';
import { ProfitService } from '../../../Services/profit.service';
import { ProfitComponent } from '../profit.component';

@Component({
	selector: 'kt-profitlist',
	templateUrl: './profitlist.component.html',
	styleUrls: ['./profitlist.component.scss']
})
export class ProfitlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Profit>();
	displayedColumns: string[] = ['name', 'countryName', 'cityName', 'stateName', 'areaName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _ProfitService: ProfitService, public dialog: MatDialog, public snackBar: MatSnackBar,
		private _commonservice: CommonService,) { }
	async ngOnInit() {
	}

	async GetSales(date) {

		this._ProfitService.GetProfitBYDate(date)
			.subscribe(res => {
				this.dataSource.data = res as Profit[];
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}, (err: HttpErrorResponse) => {
				alert("No Record Found")
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
		this.dialog.open(ProfitComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(ProfitComponent, dialogconfig);
	}
}





