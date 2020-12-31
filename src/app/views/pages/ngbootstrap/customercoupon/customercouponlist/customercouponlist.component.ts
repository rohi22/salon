import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CustomerCoupon } from '../../../models/customercoupon';
import { CommonService } from '../../../Services/common.service';
import { CustomercouponService } from '../../../Services/customercoupon.service';
import { CustomercouponComponent } from '../customercoupon.component';

@Component({
	selector: 'kt-customercouponlist',
	templateUrl: './customercouponlist.component.html'
})
export class CustomercouponlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CustomerCoupon>();
	displayedColumns: string[] = ['id', 'percentage', 'expiryDate', 'couponCode', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _CustomercouponService: CustomercouponService, public dialog: MatDialog,private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.GetCustomerCoupon();
	}

	async GetCustomerCoupon() {
		this._CustomercouponService.GetCustomerCoupon()
			.subscribe(res => {
				this.dataSource.data = res as CustomerCoupon[];
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
		this.dialog.open(CustomercouponComponent, dialogconfig);
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._CustomercouponService.DeletCustomerCoupon(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			console.log(res)
		}, (error: HttpErrorResponse) => {
			alert(error.message)
			console.log(error.message)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(CustomercouponComponent, dialogconfig);
	}
}
