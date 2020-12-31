import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { AbsentdeductionService } from '../../../../Services/absentdeduction.service';
import { AbsentDeduction } from '../../../../models/abentdeduction';
import { AbsentComponent } from '../absent.component';
import { CommonService } from '../../../../Services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'kt-absentlist',
	templateUrl: './absentlist.component.html'
})
export class AbsentlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<AbsentDeduction>();
	displayedColumns: string[] = ['id', 'deductionPercentage', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _AbsentdeductionService: AbsentdeductionService, public dialog: MatDialog,
		public snackBar: MatSnackBar,private _commonservice :CommonService) { }
	async ngOnInit() {
		await this.getAllabsents();
	}

	async getAllabsents() {
		this._AbsentdeductionService.getAllabsent()
			.subscribe(res => {
				this.dataSource.data = res as AbsentDeduction[];
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
		let dialog = this.dialog.open(AbsentComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllabsents();
		  });
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(AbsentComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllabsents();
		  });
	}

	async Delete(index) {
		this._AbsentdeductionService.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllabsents();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}




