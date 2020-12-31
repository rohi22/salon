import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { State } from '../../../../models/state';
import { CommonService } from '../../../../Services/common.service';
import { StateComponent } from '../state.component';
import { StateService } from '../state.service';

@Component({
	selector: 'kt-statelist',
	templateUrl: './statelist.component.html'
})
export class StatelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<State>();
	displayedColumns: string[] = ['stateName', 'countryName', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private _commonservice: CommonService, private _state: StateService, public dialog: MatDialog) { }

	async ngOnInit() {
		await this.getAllState();
	}

	async getAllState() {
		this._commonservice.getAllState()
			.subscribe(res => {
				this.dataSource.data = res as State[];
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
		let dialog = this.dialog.open(StateComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllState();
		  });
	}


	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(StateComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllState();
		  });
	}

	async Delete(index) {
		this._commonservice.DeletState(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllState();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}
}
