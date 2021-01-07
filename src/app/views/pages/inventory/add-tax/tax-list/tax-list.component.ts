import { AddTaxComponent } from './../add-tax.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../models/product';
import { ProductComponent } from '../../../ngbootstrap/product/product.component';
import { CommonService } from '../../../Services/common.service';
import { ProductService } from '../../../Services/product.service';
import { Tax } from '../../../models/Tax';
import { TaxService } from '../../../Services/tax.service';

@Component({
  selector: 'kt-add-tax',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit {
	public dataSource = new MatTableDataSource<Tax>();
	displayedColumns: string[] = ['id', 'title', 'percentage','description' , 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _TaxService: TaxService, public dialog: MatDialog, public snackBar: MatSnackBar,private _commonservice: CommonService,) { }
	async ngOnInit() {
		await this.getAllBrands();
	}

	async getAllBrands() {
		this._TaxService.getAllTax()
			.subscribe(res => {
				this.dataSource.data = res as Tax[];
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
		let dialog = this.dialog.open(AddTaxComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		  });
	}

	async Delete(id) {
		let headers = localStorage.getItem("Authorization")
		this._TaxService.DeleteTax(id.id, this._commonservice.getHeaerOptions()).subscribe(res => {
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
		let dialog = this.dialog.open(AddTaxComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllBrands();
		  });
	}

}
