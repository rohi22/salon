import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonService } from '../../../Services/common.service';
import { DesignationComponent } from '../designation.component';
import { DesignationService } from '../designation.service';
import { Designation } from '../designationclass';

@Component({
	moduleId: module.id,
	selector: 'designationlist',
	templateUrl: 'designationlist.component.html'
})
export class DesignationlistComponent {
	public dataSource = new MatTableDataSource<Designation>();
	displayedColumns: string[] = ['designationName', 'departmentName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild('matSort', { static: true }) sort: MatSort;
	constructor(private _designationservice: DesignationService, public dialog: MatDialog,
		public snackBar: MatSnackBar, private _commonservice: CommonService) { }
	async ngOnInit() {
		await this.getAllDesignation();
	}

	async getAllDesignation() {
		debugger
		this._designationservice.getDesignation().subscribe(res => {
			debugger
			this.dataSource.data = res as Designation[];
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
		this.dialog.open(DesignationComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		this.dialog.open(DesignationComponent, dialogconfig);
	}

	async Delete(index) {
		this._designationservice.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}





