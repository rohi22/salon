import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Country } from '../../../../../pages/models/country';
import { ApiLinks } from '../../../../Services/APILinks';
import { CommonService } from '../../../../Services/common.service';
import { CountryComponent } from '../country.component';

@Component({
	selector: 'kt-countrylist',
	templateUrl: './countrylist.component.html'
})
export class CountrylistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Country>();
	displayedColumns: string[] = ['country', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private _commonservice: CommonService, private _links: ApiLinks, public dialog: MatDialog) { }

	async ngOnInit() {
		await this.getAllCountry();
	}

	async getAllCountry() {

		this._commonservice.getCountry()
			.subscribe(res => {
				this.dataSource.data = res as Country[];
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
		let dialog =this.dialog.open(CountryComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			 ;
			this.getAllCountry();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(CountryComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCountry();
		  });
	}

	async Delete(index) {
		this._commonservice.DeletCountry(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
