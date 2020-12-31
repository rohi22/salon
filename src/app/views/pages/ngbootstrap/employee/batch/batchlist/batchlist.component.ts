import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { Batch } from '../../../../models/batch';
import { BatchService } from '../../../../Services/batch.service';
import { BatchComponent } from '../batch.component';

@Component({
	selector: 'kt-batchlist',
	templateUrl: './batchlist.component.html'
})
export class BatchlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Batch>();
	displayedColumns: string[] = ['id', 'bufferTime', 'createdAt', 'createdBy', 'startingTime', 'endingTime', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _BatchService: BatchService, private _commonService: CommonService) { }

	async ngOnInit() {
		await this.getAllBAtch();
	}

	async getAllBAtch() {
		this._BatchService.getAllBatch()
			.subscribe(res => {
				this.dataSource.data = res as Batch[];
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

		let dialog = this.dialog.open(BatchComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBAtch();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(BatchComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBAtch();
		  });
	}

	async Delete(index) {
		this._BatchService.DeletRecord(index.id, this._commonService.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllBAtch();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
