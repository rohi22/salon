import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CustomerUpdate } from '../../../models/customerupdate';
import { CommonService } from '../../../Services/common.service';
import { CustomerService } from '../../../Services/customer.service';
import { CustomerupdateComponent } from '../customerupdate.component';

@Component({
	selector: 'kt-customerupdatelist',
	templateUrl: './customerupdatelist.component.html',
	styleUrls: ['./customerupdatelist.component.scss']
})
export class CustomerupdatelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CustomerUpdate>();
	displayedColumns: string[] = ['id', 'name', 'cnic', 'contactNo', 'email', 'countryName', 'stateName',
		'cityName', 'areaName', 'address', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _CustomerService: CustomerService, public dialog: MatDialog, public snackBar: MatSnackBar, private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.getAllCustomer();
	}

	async getAllCustomer() {
		this._CustomerService.getAllCustomer()
			.subscribe(res => {
				this.dataSource.data = res as CustomerUpdate[];
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}, (err: HttpErrorResponse) => {
				alert(err.message)
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
		let dialog = this.dialog.open(CustomerupdateComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCustomer();
		});
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(CustomerupdateComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCustomer();
		});
	}
}
