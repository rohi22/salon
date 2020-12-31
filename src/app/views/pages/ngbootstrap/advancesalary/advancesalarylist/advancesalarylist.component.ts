import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { AdvanceSalary } from '../../../models/advancesalary';
import { AdvancesalaryService } from '../../../Services/advancesalary.service';
import { CommonService } from '../../../Services/common.service';
import { AdvancesalaryComponent } from '../advancesalary.component';

@Component({
	selector: 'kt-advancesalarylist',
	templateUrl: './advancesalarylist.component.html'
})
export class AdvancesalarylistComponent implements OnInit {
	public dataSource = new MatTableDataSource<AdvanceSalary>();
	displayedColumns: string[] = ['id', 'maxPercentage', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _AdvancesalaryService: AdvancesalaryService, public dialog: MatDialog, private _commonservice: CommonService,
		public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.GetAdvancedSalary();
	}

	async GetAdvancedSalary() {
		this._AdvancesalaryService.GetAdvancedSalary()
			.subscribe(res => {
				this.dataSource.data = res as AdvanceSalary[];
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
		let dialog = this.dialog.open(AdvancesalaryComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.GetAdvancedSalary();
		  });
	}

	async Delete(id) {
		this._AdvancesalaryService.DeleteAdvancedSalary(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.GetAdvancedSalary();
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
		let dialog = this.dialog.open(AdvancesalaryComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.GetAdvancedSalary();
		  });
	}
}
