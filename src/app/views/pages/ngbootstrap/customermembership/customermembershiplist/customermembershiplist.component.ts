import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CustomerMemberShip } from '../../../models/customermmebership';
import { CommonService } from '../../../Services/common.service';
import { CustomermembershipService } from '../../../Services/customermembership.service';
import { CustomermembershipComponent } from '../customermembership.component';

@Component({
	selector: 'kt-customermembershiplist',
	templateUrl: './customermembershiplist.component.html'
})
export class CustomermembershiplistComponent implements OnInit {
	public dataSource = new MatTableDataSource<CustomerMemberShip>();
	displayedColumns: string[] = ['id', 'cardNo', 'customerName', 'percentageOff', 'startingDate', 'endingDate', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _CustomermembershipService: CustomermembershipService, public dialog: MatDialog, private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.GetCustomerMemberdhipCard();
	}

	async GetCustomerMemberdhipCard() {
		this._CustomermembershipService.GetCustomerMemberdhipCard()
			.subscribe(res => {
				this.dataSource.data = res as CustomerMemberShip[];
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
		this.dialog.open(CustomermembershipComponent, dialogconfig);
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._CustomermembershipService.DeletCustomerMemberdhipCard(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
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
		this.dialog.open(CustomermembershipComponent, dialogconfig);
	}
}
