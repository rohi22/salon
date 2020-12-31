import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SalesReturn } from '../../../models/salesreturn';
import { CommonService } from '../../../Services/common.service';
import { SalesreturnService } from '../../../Services/salesreturn.service';
import { SalesreturnComponent } from '../salesreturn.component';

@Component({
	selector: 'kt-salesreturnlist',
	templateUrl: './salesreturnlist.component.html',
	styleUrls: ['./salesreturnlist.component.scss']
})
export class SalesreturnlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<SalesReturn>();
	displayedColumns: string[] = ['id', 'userId', 'batchId', 'serviceWiseCommission', 'createdAt',
		'createdBy', 'updatedBy'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _SalesreturnService: SalesreturnService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.Getpurchasereturn();
	}

	async Getpurchasereturn() {
		this._SalesreturnService.Getpurchasereturn()
			.subscribe(res => {
				this.dataSource.data = res as SalesReturn[];
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
		this.dialog.open(SalesreturnComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "70%";
		dialogconfig.data = edit;
		this.dialog.open(SalesreturnComponent, dialogconfig);
	}

}
