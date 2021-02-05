import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { BankAccount } from '../../../../models/bankaccout';
import { BankaccountService } from '../../../../Services/bankaccount.service';
import { BankaccountComponent } from '../bankaccount.component';

@Component({
	selector: 'kt-bankaccountlist',
	templateUrl: './bankaccountlist.component.html'
})
export class BankaccountlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<BankAccount>();
	displayedColumns: string[] = ['id', 'accountTitle', 'branchCode', 'bankTitle', 'accountTypeName',
		'accountNumber', 'ibanNumber', 'swiftcode', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _BankaccountService: BankaccountService, public dialog: MatDialog,private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.getAllbankaccount();
	}

	async getAllbankaccount() {
		this._BankaccountService.getAllbankaccount()
			.subscribe(res => {
				this.dataSource.data = res as BankAccount[];
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

		let dialog = this.dialog.open(BankaccountComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllbankaccount();
		  });
	}

	// async Delete(id) {
	//
	// 	let headers = localStorage.getItem("Authorization")
	// 	this._BankaccountService.dele(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
	// 		alert("Delete");
	// 		console.log(res)
	// 	}, (error: HttpErrorResponse) => {
	// 		console.log(error);
	// 		alert(error.error)
	// 	})
	// }

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(BankaccountComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllbankaccount();
		  });
	}
}





