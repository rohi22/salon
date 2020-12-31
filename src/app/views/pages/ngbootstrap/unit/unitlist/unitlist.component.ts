import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Unit } from '../../../models/unit';
import { CommonService } from '../../../Services/common.service';
import { UnitsService } from '../../../Services/units.service';
import { UnitComponent } from '../unit.component';

@Component({
  selector: 'kt-unitlist',
  templateUrl: './unitlist.component.html'
})
export class UnitlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Unit>();
	displayedColumns: string[] = ['id', 'unitName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _UnitsService: UnitsService, public dialog: MatDialog, public snackBar: MatSnackBar,private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.getAllBrands();
	}

	async getAllBrands() {
		this._UnitsService.getAllUnits()
			.subscribe(res => {
				this.dataSource.data = res as Unit[];
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
		let dialog = this.dialog.open(UnitComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		  });
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._UnitsService.DeleteUNit(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.getAllBrands();
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
		let dialog = this.dialog.open(UnitComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		  });
	}
}

