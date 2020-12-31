import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { PurchaseReturn } from '../../../models/purchasereturn';
import { CommonService } from '../../../Services/common.service';
import { PurchasereturnService } from '../../../Services/purchasereturn.service';
import { PurchasereturnComponent } from '../purchasereturn.component';

@Component({
  selector: 'kt-purchasereturnlist',
  templateUrl: './purchasereturnlist.component.html',
  styleUrls: ['./purchasereturnlist.component.scss']
})
export class PurchasereturnlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<PurchaseReturn>();
	displayedColumns: string[] = ['id', 'userId', 'batchId', 'serviceWiseCommission', 'createdAt',
		'createdBy', 'updatedBy'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private PurchasereturnService: PurchasereturnService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.GetALLPOReturn();
	}

	async GetALLPOReturn() {
		this.PurchasereturnService.GetALLPOReturn()
			.subscribe(res => {
				this.dataSource.data = res as PurchaseReturn[];
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
		this.dialog.open(PurchasereturnComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "70%";
		dialogconfig.data = edit;
		this.dialog.open(PurchasereturnComponent, dialogconfig);
	}

}
