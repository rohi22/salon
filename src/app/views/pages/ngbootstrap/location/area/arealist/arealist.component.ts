import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Area } from '../../../../../pages/models/area';
import { ApiLinks } from '../../../../../pages/Services/APILinks';
import { CommonService } from '../../../../../pages/Services/common.service';
import { AreaComponent } from '../area.component';

@Component({
	selector: 'kt-arealist',
	templateUrl: './arealist.component.html'
})
export class ArealistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Area>();
	displayedColumns: string[] = ['area', 'cityName', 'stateName', 'countryName','actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private _commonservice: CommonService, private _links: ApiLinks, public dialog: MatDialog) { }

	async ngOnInit() {
		await this.getAllArea();
	}

	async getAllArea  ()  {
		this._commonservice.getAllArea()
			.subscribe(res => {
				this.dataSource.data = res as Area[];
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
		let dialog = this.dialog.open(AreaComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllArea();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(AreaComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllArea();
		  });
	}

	async Delete(index) {
		this._commonservice.DeleteArea(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllArea();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
