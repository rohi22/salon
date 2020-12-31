import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Brand } from '../../../models/brand';
import { BrandsService } from '../../../Services/brands.service';
import { CommonService } from '../../../Services/common.service';
import { BrandComponent } from '../brand.component';

@Component({
	selector: 'kt-brandlist',
	templateUrl: './brandlist.component.html'
})
export class BrandlistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Brand>();
	displayedColumns: string[] = ['id', 'brand', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	res: any;
	constructor(private _BrandsService: BrandsService, public dialog: MatDialog, public snackBar: MatSnackBar,private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.getAllBrands();
	}

	async getAllBrands() {
		this._BrandsService.getAllBrands()
			.subscribe(res => {
				this.dataSource.data = res as Brand[];
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
		let dialog = this.dialog.open(BrandComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		  });
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._BrandsService.DeleteBrand(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
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
		let dialog = this.dialog.open(BrandComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		  });
	}
}





