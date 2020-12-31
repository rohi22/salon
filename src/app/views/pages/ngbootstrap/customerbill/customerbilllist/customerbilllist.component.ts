import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { CustomerBill } from '../../../models/customerbill';
import { CommonService } from '../../../Services/common.service';
import { CustomerbillService } from '../../../Services/customerbill.service';
import { CustomerbillComponent } from '../customerbill.component';

@Component({
	selector: 'kt-customerbilllist',
	templateUrl: './customerbilllist.component.html',
	styleUrls: ['./customerbilllist.component.scss']
})
export class CustomerbilllistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CustomerBill>();
	displayedColumns: string[] = ['id', 'branchName', 'customerName', 'paymentMethodName', 'totalDiscount',
		'grossAmount', 'totalBill', 'tax', 'dueDate', 'billDate', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _CustomerbillService: CustomerbillService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.GetCustomerBill();
	}

	async GetCustomerBill() {
		this._CustomerbillService.GetCustomerBill()
			.subscribe(res => {
				this.dataSource.data = res as CustomerBill[];
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
		this.dialog.open(CustomerbillComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "90%";
		dialogconfig.data = edit;
		this.dialog.open(CustomerbillComponent, dialogconfig);
	}

}
