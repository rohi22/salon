import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { BankBranch } from '../../../../models/bankbranch';
import { BankbranchesService } from '../../../../Services/bankbranches.service';
import { BankbranchesComponent } from '../bankbranches.component';

@Component({
	selector: 'kt-bankbrancheslist',
	templateUrl: './bankbrancheslist.component.html'
})
export class BankbrancheslistComponent implements OnInit {

	public dataSource = new MatTableDataSource<BankBranch>();
	displayedColumns: string[] = ['id', 'branchCode', 'bankTitle', 'countryName', 'stateName', 'cityName', 'areaName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _BankbranchesService: BankbranchesService, public dialog: MatDialog, private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.getAllbankbranch();
	}

	async getAllbankbranch() {
		this._BankbranchesService.getAllbankbranch()
			.subscribe(res => {
				this.dataSource.data = res as BankBranch[];
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
		let dialog = this.dialog.open(BankbranchesComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllbankbranch();
		  });
	}

	async Delete(id) {
		debugger
		let headers = localStorage.getItem("Authorization")
		this._BankbranchesService.DeleteBankBranch(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.getAllbankbranch();
			console.log(res)
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.error)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(BankbranchesComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllbankbranch();
		  });
	}
}





