import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { CompanyPaidPayment } from '../../../models/companypaidpament';
import { CommonService } from '../../../Services/common.service';
import { CompanypaidpaymentService } from '../../../Services/companypaidpayment.service';
import { CompanypaidpaymentsComponent } from '../companypaidpayments.component';

@Component({
  selector: 'kt-companypaidpaymentslist',
  templateUrl: './companypaidpaymentslist.component.html',
  styleUrls: ['./companypaidpaymentslist.component.scss']
})
export class CompanypaidpaymentslistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CompanyPaidPayment>();
	displayedColumns: string[] = ['id', 'cardNo', 'circles', 'usedCircles', 'issueDate', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _CompanypaidpaymentService: CompanypaidpaymentService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.Getpayment();
	}

	async Getpayment() {
		this._CompanypaidpaymentService.Getpayment()
			.subscribe(res => {
				this.dataSource.data = res as CompanyPaidPayment[];
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
		dialogconfig.width = "90%";
		dialogconfig.height = "90%";
		dialogconfig.data = {};
		this.dialog.open(CompanypaidpaymentsComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "90%";
		dialogconfig.height = "90%";
		dialogconfig.data = edit;
		this.dialog.open(CompanypaidpaymentsComponent, dialogconfig);
	}
}
