import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from '../../../../Services/employee.service';
import { Employee } from '../../../../models/employee';
import { EmployeeComponent } from '../employee.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../../../Services/common.service';

@Component({
	selector: 'kt-employeelist',
	templateUrl: './employeelist.component.html'
})
export class EmployeelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Employee>();
	displayedColumns: string[] = ['id', 'userId', 'batchId', 'serviceWiseCommission', 'createdAt',
		'createdBy', 'updatedBy', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _EmployeeService: EmployeeService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.getAllEmployee();
	}

	async getAllEmployee() {
		this._EmployeeService.getAllEmployee()
			.subscribe(res => {
				this.dataSource.data = res as Employee[];
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
		let dialog = this.dialog.open(EmployeeComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllEmployee();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "70%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(EmployeeComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllEmployee();
		  });
	}
	async Delete(index) {
		this._EmployeeService.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllEmployee();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}

}
