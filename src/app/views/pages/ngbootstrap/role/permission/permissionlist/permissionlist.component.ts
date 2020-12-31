import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PermissionService } from '../../../../Services/permission.service';
import { PermissionsModel } from '../../../../models/permission';
import { ApiLinks } from '../../../../Services/APILinks';
import { PermissionComponent } from '../permission.component';
import { CommonService } from '../../../../Services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'kt-permissionlist',
	templateUrl: './permissionlist.component.html'
})
export class PermissionlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<PermissionsModel>();
	displayedColumns: string[] = ['id', 'permission', 'type', 'description', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private _links: ApiLinks,
		public dialog: MatDialog, private _permissoin: PermissionService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.getAllPermission();
	}

	async getAllPermission() {
		this._permissoin.getAllPermission()
			.subscribe(res => {
				this.dataSource.data = res as PermissionsModel[];
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
		this.dialog.open(PermissionComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(PermissionComponent, dialogconfig);
	}

	async Delete(index) {
		this._permissoin.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
