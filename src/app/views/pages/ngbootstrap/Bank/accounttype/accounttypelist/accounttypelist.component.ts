import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { AccountType } from '../../../../models/accounttype';
import { AccounttypeService } from '../../../../Services/accounttype.service';
import { AccounttypeComponent } from '../accounttype.component';

@Component({
	selector: 'kt-accounttypelist',
	templateUrl: './accounttypelist.component.html'
})
export class AccounttypelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<AccountType>();
	displayedColumns: string[] = ['id', 'accountType', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _AccounttypeService: AccounttypeService, public dialog: MatDialog, private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.getAllAccountTYpe();
	}

	async getAllAccountTYpe() {
		this._AccounttypeService.getAllAccountTYpe()
			.subscribe(res => {
				this.dataSource.data = res as AccountType[];
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
		this.dialog.open(AccounttypeComponent, dialogconfig);
	}

	async Delete(id) {

		let headers = localStorage.getItem("Authorization")
		this._AccounttypeService.DeleteAccounttype(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			console.log(res)
		}, (error: HttpErrorResponse) => {

			console.log(error);
			alert(error.message)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(AccounttypeComponent, dialogconfig);
	}
}





