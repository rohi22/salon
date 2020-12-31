import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../Services/common.service';
import { Department } from '../department';
import { DepartmentComponent } from '../department.component';
import { DepartmentService } from '../department.service';

@Component({
	moduleId: module.id,
	selector: 'departmentlist',
	templateUrl: 'departmentlist.component.html'
})
export class DepartmentlistComponent {
	public dataSource = new MatTableDataSource<Department>();
	displayedColumns: string[] = ['departmentName', 'createdAt', 'modifiedAt', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _DepartmentService: DepartmentService, public dialog: MatDialog,
		 public snackBar: MatSnackBar,private _commonservice : CommonService) { }
	async ngOnInit() {
		await this.getAllDepartment();
	}

	async getAllDepartment() {
		this._DepartmentService.getDepartment()
			.subscribe(res => {
				this.dataSource.data = res as Department[];
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
		this.dialog.open(DepartmentComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(DepartmentComponent, dialogconfig);
	}

	async Delete(index) {
		this._DepartmentService.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}




