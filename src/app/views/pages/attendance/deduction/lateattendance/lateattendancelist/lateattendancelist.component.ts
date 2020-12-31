import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { CommonService } from '../../../../Services/common.service';
import { LateDeduction } from '../../../../models/latededuction';
import { LateattendancedeductionService } from '../../../../Services/lateattendancededuction.service';
import { LateattendanceComponent } from '../lateattendance.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'kt-lateattendancelist',
	templateUrl: './lateattendancelist.component.html'
})
export class LateattendancelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<LateDeduction>();
	displayedColumns: string[] = ['id', 'deductionAmount', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _Lateattendancededuction: LateattendancedeductionService, public dialog: MatDialog,
		public snackBar: MatSnackBar,private _commonservice : CommonService) { }
	async ngOnInit() {
		await this.getAllBranch();
	}

	async getAllBranch() {
		this._Lateattendancededuction.getGetAlllateAttendance()
			.subscribe(res => {
				this.dataSource.data = res as LateDeduction[];
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
		let dialog = this.dialog.open(LateattendanceComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBranch();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(LateattendanceComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBranch();
		  });
	}

	async Delete(index) {
		this._Lateattendancededuction.DeletLateAttendanceDeduction(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllBranch();
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		})
	}


}




