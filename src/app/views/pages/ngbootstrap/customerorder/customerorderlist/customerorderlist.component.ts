import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { CustomerOrder } from '../../../models/customerorder';
import { CommonService } from '../../../Services/common.service';
import { CustomerorderService } from '../../../Services/customerorder.service';
import { CustomerorderComponent } from '../customerorder.component';

@Component({
	selector: 'kt-customerorderlist',
	templateUrl: './customerorderlist.component.html',
	styleUrls: ['./customerorderlist.component.scss']
})
export class CustomerorderlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CustomerOrder>();
	displayedColumns: string[] = ['id', 'paymentMethodName', 'customerName', 'customerType', 'branchName',
		'totalDiscount', 'grossAmount', 'netAmount', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _CustomerorderService: CustomerorderService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.GetCustomerOrder();
	}

	async GetCustomerOrder() {
		this._CustomerorderService.GetCustomerOrder()
			.subscribe(res => {
				this.dataSource.data = res as CustomerOrder[];
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
		dialogconfig.height = "90%";
		dialogconfig.data = {};
		this.dialog.open(CustomerorderComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "90%";
		dialogconfig.data = edit;
		this.dialog.open(CustomerorderComponent, dialogconfig);
	}

}
