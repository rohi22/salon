import { ApiLinks } from './../../../Services/APILinks';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Product } from '../../../models/product';

import { CommonService } from '../../../Services/common.service';
import { ProductService } from '../../../Services/product.service';
import { ProductComponent } from '../product.component';

@Component({
	selector: 'kt-produclist',
	templateUrl: './produclist.component.html'
})
export class ProduclistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Product>();
	displayedColumns: string[] = ['id', 'productName','categoryName', 'unitName','price','brandName', 'status', 'image', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	imagePath = this.apiLinks.imagePath
	constructor(private _ProductService: ProductService, public dialog: MatDialog, public snackBar: MatSnackBar, private _commonservice: CommonService, private apiLinks: ApiLinks,) { }
	async ngOnInit() {
		await this.getAllBrands();
	}

	async getAllBrands() {
		this._ProductService.getAllProduct()
			.subscribe(res => {
				this.dataSource.data = res as Product[];
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
		let dialog = this.dialog.open(ProductComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		});
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._ProductService.DeleteProduct(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
			alert("Delete");
			this.getAllBrands();
			console.log(res)
		}, (error: HttpErrorResponse) => {
			alert(error.error)
			console.log(error)
		})
	}

	async Edit(edit) {
		const dialogconfig = new MatDialogConfig();
		dialogconfig.autoFocus = true;
		dialogconfig.disableClose = true;
		dialogconfig.width = "75%";
		dialogconfig.data = edit;
		let dialog = this.dialog.open(ProductComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		});
	}
}
