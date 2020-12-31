import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { LoyalityCard } from '../../../models/loyalitycard';
import { CommonService } from '../../../Services/common.service';
import { LoyalitycardService } from '../../../Services/loyalitycard.service';
import { CustomerloyalitycardtransactionComponent } from '../customerloyalitycardtransaction.component';

@Component({
  selector: 'kt-customerloyalitycardtransactionlist',
  templateUrl: './customerloyalitycardtransactionlist.component.html',
  styleUrls: ['./customerloyalitycardtransactionlist.component.scss']
})
export class CustomerloyalitycardtransactionlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<LoyalityCard>();
	displayedColumns: string[] = ['id', 'cardNo', 'circles', 'usedCircles', 'issueDate', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _LoyalitycardService: LoyalitycardService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.GetCustomerLoyalityCard();
	}

	async GetCustomerLoyalityCard() {
		this._LoyalitycardService.GetCustomerLoyalityCard()
			.subscribe(res => {
				this.dataSource.data = res as LoyalityCard[];
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
		dialogconfig.height = "70%";
		dialogconfig.data = {};
		this.dialog.open(CustomerloyalitycardtransactionComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "70%";
		dialogconfig.data = edit;
		this.dialog.open(CustomerloyalitycardtransactionComponent, dialogconfig);
	}
	async Delete(index) {
		this._LoyalitycardService.DeleteCustomerLoyalityCard(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}

}
