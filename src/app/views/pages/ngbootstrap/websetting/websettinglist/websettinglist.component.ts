import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { WebSetting } from '../../../models/websetting';
import { CommonService } from '../../../Services/common.service';
import { WebsettingService } from '../../../Services/websetting.service';
import { WebsettingComponent } from '../websetting.component';

@Component({
	selector: 'kt-websettinglist',
	templateUrl: './websettinglist.component.html',
	styleUrls: ['./websettinglist.component.scss']
})
export class WebsettinglistComponent implements OnInit {
	public dataSource = new MatTableDataSource<WebSetting>();
	displayedColumns: string[] = ['id', 'companyName', 'companyDescription', 'address', 'companyEmail',
		'companyContact', 'faxNumber', 'web', 'logo', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog, private _WebsettingService: WebsettingService, private _commonservice: CommonService) { }

	async ngOnInit() {
		await this.getallWebsetting();
	}

	async getallWebsetting() {
		this._WebsettingService.getallWebsetting()
			.subscribe(res => {
				this.dataSource.data = res as WebSetting[];
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
		dialogconfig.height = "70%";
		dialogconfig.data = {};
		this.dialog.open(WebsettingComponent, dialogconfig);
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.height = "70%";
		dialogconfig.data = edit;
		this.dialog.open(WebsettingComponent, dialogconfig);
	}

}
