import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Currency } from '../../../models/currency';
import { CommonService } from '../../../Services/common.service';
import { CurrencyService } from '../../../Services/currency.service';
import { CurrencyComponent } from '../currency.component';

@Component({
	selector: 'kt-currencylist',
	templateUrl: './currencylist.component.html'
})
export class CurrencylistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Currency>();
	displayedColumns: string[] = ['id', 'currencyName', 'currencySymbol', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _CurrencyService: CurrencyService, public dialog: MatDialog, private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.GetAllCurrency();
	}

	async GetAllCurrency() {
		this._CurrencyService.GetAllCurrency()
			.subscribe(res => {
				this.dataSource.data = res as Currency[];
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
		let dialog = this.dialog.open(CurrencyComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.GetAllCurrency();
		  });
	}

	async Delete(id) {
		debugger
		let headers = localStorage.getItem("Authorization")
		this._CurrencyService.DeletCurrency(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.GetAllCurrency();
			console.log(res)
		}, (error: HttpErrorResponse) => {
			alert(error.message)
			console.log(error)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(CurrencyComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.GetAllCurrency();
		  });
	}
}
