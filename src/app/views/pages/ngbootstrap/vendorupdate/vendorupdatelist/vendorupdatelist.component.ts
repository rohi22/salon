import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { VendorUpdate } from '../../../models/vendorupdate';
import { CommonService } from '../../../Services/common.service';
import { VendorService } from '../../../Services/vendor.service';
import { VendorupdateComponent } from '../vendorupdate.component';

@Component({
	selector: 'kt-vendorupdatelist',
	templateUrl: './vendorupdatelist.component.html',
	styleUrls: ['./vendorupdatelist.component.scss']
})
export class VendorupdatelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<VendorUpdate>();
	displayedColumns: string[] = ['id', 'vendorName', 'cnic', 'contactNo', 'email', 'countryName', 'stateName',
		'cityName', 'areaName', 'address', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _VendorService: VendorService, public dialog: MatDialog, public snackBar: MatSnackBar, private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.GetALLvendor();
	}

	async GetALLvendor() {
		this._VendorService.GetALLvendor()
			.subscribe(res => {
				this.dataSource.data = res as VendorUpdate[];
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
		let dialog = this.dialog.open(VendorupdateComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.GetALLvendor();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(VendorupdateComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.GetALLvendor();
		  });
	}
}
