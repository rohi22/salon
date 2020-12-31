import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { GRN } from '../../../models/grn';
import { ApiLinks } from '../../../Services/APILinks';
import { CommonService } from '../../../Services/common.service';
import { GrnserviceService } from '../../../Services/grnservice.service';
import { GrnComponent } from '../grn.component';

@Component({
	selector: 'kt-grnlist',
	templateUrl: './grnlist.component.html'
})
export class GrnlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<GRN>();
	displayedColumns: string[] = ['area', 'cityName', 'stateName', 'countryName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private _commonservice: CommonService, private _links: ApiLinks, public dialog: MatDialog, private _GRNSerivce: GrnserviceService) { }

	async ngOnInit() {
		await this.getAllGRN();
	}

	async getAllGRN() {
		this._GRNSerivce.getAllGRN()
			.subscribe(res => {
				this.dataSource.data = res as GRN[];
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
		this.dialog.open(GrnComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(GrnComponent, dialogconfig);
	}

	async Delete(index) {
		this._commonservice.DeleteArea(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
