import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ServiceService } from '../../../../Services/service.service';
import { Services } from '../../../../models/services';
import { ServiceComponent } from '../service.component';
import { CommonService } from '../../../../Services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiLinks } from '../../../../Services/APILinks';

@Component({
	selector: 'kt-servicelist',
	templateUrl: './servicelist.component.html'
})
export class ServicelistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Services>();
	displayedColumns: string[] = ['id', 'name', 'charges', 'description', 'image', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	imagePath = this.apiLinks.imagePath
	constructor(public dialog: MatDialog, private _ServiceService: ServiceService, private _commonservice: CommonService, private apiLinks: ApiLinks) { }

	async ngOnInit() {
		await this.getAllServices();
	}

	async getAllServices() {
		this._ServiceService.getAllServices()
			.subscribe(res => {
				this.dataSource.data = res as Services[];
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

		let dialog = this.dialog.open(ServiceComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllServices();
		});
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(ServiceComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllServices();
		});
	}

	async Delete(index) {
		this._ServiceService.DeletRecord(index.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete")
			this.getAllServices();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
		})
	}

}
