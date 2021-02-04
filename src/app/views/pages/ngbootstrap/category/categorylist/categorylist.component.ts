import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../Services/product.service';
import { CategoryComponent } from '../category.component';

@Component({
	selector: 'kt-produclist',
	templateUrl: './categorylist.component.html'
})
export class CategorylistComponent implements OnInit {
	public dataSource = new MatTableDataSource<Category>();
	displayedColumns: string[] = ['id', 'CategoryTitle', 'Type','status', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private _CategoryService: CategoryService, public dialog: MatDialog, public snackBar: MatSnackBar) { }
	async ngOnInit() {
		await this.getAllCategory();
	}

	async getAllCategory() {
		this._CategoryService.getAllCategory()
			.subscribe(res => {
				this.dataSource.data = res as Category[];
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
		let dialog = this.dialog.open(CategoryComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCategory();
		  });
	}

	async Delete(id) {
		this._CategoryService.DeleteCategory(id.id).subscribe(res => {
			alert("Delete");
			this.getAllCategory();
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
		let dialog = this.dialog.open(CategoryComponent, dialogconfig);
		dialog.afterClosed().subscribe(result => {
			this.getAllCategory();
		  });
	}
}
