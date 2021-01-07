import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../../models/user';
import { CommonService } from '../../../Services/common.service';
import { UserComponent } from '../user.component';
import { UserService } from '../user.service';

@Component({
	moduleId: module.id,
	selector: 'userlist',
	templateUrl: 'userlist.component.html'
})
export class UserlistComponent {
	public dataSource = new MatTableDataSource<User>();
	displayedColumns: string[] = ['id', 'email', 'departmentName', 'designationName', 'branchName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('matSort', { static: true }) sort: MatSort;
	constructor(private _userservice: UserService, public dialog: MatDialog,
		public snackBar: MatSnackBar, private _commonservice: CommonService) { }
	async ngOnInit() {
		await this.getAll();
	}

	async getAll() {
		debugger
		this._userservice.getAllUsers().subscribe(res => {
			debugger
			this.dataSource.data = res as User[];
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	async AddNew() {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = {};
		let dialog = this.dialog.open(UserComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAll();
		});
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._userservice.DeletUser(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.getAll();
			console.log(res)
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.message)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(UserComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAll();
		});
	}

}





