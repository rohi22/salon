import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { PurchaseOrder } from '../../../models/purchaseorder';
import { CommonService } from '../../../Services/common.service';
import { PurchaseorderService } from '../../../Services/purchaseorder.service';
import { PurchaseorderComponent } from '../purchaseorder.component';

@Component({
	selector: 'kt-purchaseorderlist',
	templateUrl: './purchaseorderlist.component.html',
	styleUrls: ['./purchaseorderlist.component.scss']
})
export class PurchaseorderlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<PurchaseOrder>();
	displayedColumns: string[] = ['id', 'title', 'tax', 'grossAmount', 'netAmount',
		'discount', 'poNumber', 'vendorName', 'branchName', 'date', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _PurchaseorderService: PurchaseorderService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.getAllPO();
	}

	async getAllPO() {
		this._PurchaseorderService.getAllPO()
			.subscribe(res => {
				this.dataSource.data = res as PurchaseOrder[];
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
		dialogconfig.height = "70%";
		dialogconfig.data = {};
		let dialog = this.dialog.open(PurchaseorderComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllPO();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "70%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(PurchaseorderComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllPO();
		  });
	}
	// async Delete(index) {
	// 	this._EmployeeService.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
	// 		alert("Delete")
	// 	}, (err: HttpErrorResponse) => {
	// 		alert(err.error);
	// 	})
	// }

}
