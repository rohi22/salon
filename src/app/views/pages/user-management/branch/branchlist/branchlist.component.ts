import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { error } from 'protractor';
import { CommonService } from '../../../Services/common.service';
import { BranchComponent } from '../branch.component';
import { BranchService } from '../branch.service';
import { Branch } from '../branchclass';

@Component({
	moduleId: module.id,
	selector: 'branchlist',
	templateUrl: 'branchlist.component.html'
})
export class BranchlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Branch>();
	displayedColumns: string[] = ['name', 'countryName', 'cityName', 'stateName', 'areaName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _branchservice: BranchService, public dialog: MatDialog, public snackBar: MatSnackBar,private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.getAllBranch();
	}

	async getAllBranch() {
		this._branchservice.getAllBranch()
			.subscribe(res => {
				this.dataSource.data = res as Branch[];
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
		let dialog = this.dialog.open(BranchComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBranch();
		  });
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._branchservice.DeletRecord(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.getAllBranch();
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
		let dialog = this.dialog.open(BranchComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBranch();
		  });
	}
}




