import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeAlownces } from '../../../../models/employeealoownce';
import { AllowancesService } from '../.././../../Services/allowances.service';
import { CommonService } from '../../../../Services/common.service';
import { EmployeeallownceComponent } from '../employeeallownce.component';

@Component({
	selector: 'kt-employeeallowncelist',
	templateUrl: './employeeallowncelist.component.html'
})
export class EmployeeallowncelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<EmployeeAlownces>();
	displayedColumns: string[] = ['id', 'allowanceName', 'createdDate', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _AllowancesService: AllowancesService, private _commonService: CommonService) { }

	async ngOnInit() {
		await this.getAllAllownces();
	}

	async getAllAllownces() {
		this._AllowancesService.getAllAllownces()
			.subscribe(res => {
				this.dataSource.data = res as EmployeeAlownces[];
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
		let dialog = this.dialog.open(EmployeeallownceComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllAllownces();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(EmployeeallownceComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllAllownces();
		  });
	}

	async Delete(index) {
		this._AllowancesService.DeletAllownces(index.id, this._commonService.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllAllownces();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
