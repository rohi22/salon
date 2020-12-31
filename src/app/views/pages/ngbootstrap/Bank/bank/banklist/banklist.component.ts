import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { Bank } from '../../../../models/bank';
import { BankService } from '../../../../Services/bank.service';
import { BankComponent } from '../bank.component';

@Component({
	selector: 'kt-banklist',
	templateUrl: './banklist.component.html'
})
export class BanklistComponent implements OnInit {


	public dataSource = new MatTableDataSource<Bank>();
	displayedColumns: string[] = ['id', 'title', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _BankService: BankService, public dialog: MatDialog, public snackBar: MatSnackBar, private _commonservice: CommonService) { }
	async ngOnInit() {
		await this.getAllBranch();
	}

	async getAllBranch() {
		this._BankService.getAllBank()
			.subscribe(res => {
				this.dataSource.data = res as Bank[];
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

		let dialog = this.dialog.open(BankComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBranch();
		  });
	}

	async Delete(id) {
		debugger
		let headers = localStorage.getItem("Authorization")
		this._BankService.DeleteBank(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.getAllBranch();
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
	
		let dialog = this.dialog.open(BankComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBranch();
		  });
	}
}




