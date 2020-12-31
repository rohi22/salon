import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CustomerRewardPoint } from '../../../models/customerrewardpoint';
import { CommonService } from '../../../Services/common.service';
import { CustomerrewardpointsService } from '../../../Services/customerrewardpoints.service';
import { CustomerrewardpointComponent } from '../customerrewardpoint.component';

@Component({
	selector: 'kt-customerrewardpointlist',
	templateUrl: './customerrewardpointlist.component.html'
})
export class CustomerrewardpointlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CustomerRewardPoint>();
	displayedColumns: string[] = ['id', 'rewardName', 'spendMoneyToGetPoint', 'eligiblePoint', 'priceOfEligibilePoint', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _CustomerrewardpointsService: CustomerrewardpointsService, public dialog: MatDialog,private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.getAllBrands();
	}

	async getAllBrands() {
		this._CustomerrewardpointsService.GetCustomerRewardPoint()
			.subscribe(res => {
				this.dataSource.data = res as CustomerRewardPoint[];
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
		this.dialog.open(CustomerrewardpointComponent, dialogconfig);
	}

	async Delete(id) {
		this._CustomerrewardpointsService.DeletCustomerRewardPoint(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			console.log(res)
		}, (error: HttpErrorResponse) => {
			alert(error.message)
			console.log(error)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(CustomerrewardpointComponent, dialogconfig);
	}
}
