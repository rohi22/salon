import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { City } from '../../../../models/city';
import { ApiLinks } from '../../../../Services/APILinks';
import { CommonService } from '../../../../Services/common.service';
import { CityComponent } from '../city.component';

@Component({
	selector: 'kt-citylist',
	templateUrl: './citylist.component.html'
})
export class CitylistComponent implements OnInit {
	public dataSource = new MatTableDataSource<City>();
	displayedColumns: string[] = ['name', 'stateName', 'countryName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private _commonservice: CommonService, private _links: ApiLinks, public dialog: MatDialog) { }

	async ngOnInit() {
		await this.getAllCity();
	}

	async getAllCity() {
		this._commonservice.getAllCity()
			.subscribe(res => {
				this.dataSource.data = res as City[];
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
		let dialog = this.dialog.open(CityComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCity();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(CityComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCity();
		  });
	}

	async Delete(index) {
		this._commonservice.DeletCity(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllCity();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
