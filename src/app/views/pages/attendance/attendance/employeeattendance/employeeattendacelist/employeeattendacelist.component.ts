import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { EmployeeAttendance } from '../../../../models/employeeattendance';
import { AttendanceService } from '../../../../Services/attendance.service';
import { EmployeeattendanceComponent } from '../employeeattendance.component';

@Component({
  selector: 'kt-employeeattendacelist',
  templateUrl: './employeeattendacelist.component.html'
})
export class EmployeeattendacelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<EmployeeAttendance>();
	displayedColumns: string[] = ['name', 'countryName', 'cityName', 'stateName', 'areaName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _AttendanceService: AttendanceService, public dialog: MatDialog,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.getAllBranch();
	}

	async getAllBranch() {
		this._AttendanceService.getallattendance()
			.subscribe(res => {
				this.dataSource.data = res as EmployeeAttendance[];
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
		this.dialog.open(EmployeeattendanceComponent, dialogconfig);
	}
}




