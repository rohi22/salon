import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Category } from '../../models/Category';
import { Product } from '../../models/product';
import { BrandsService } from '../../Services/brands.service';
import { CommonService } from '../../Services/common.service';
import { CategoryService, ProductService } from '../../Services/product.service';
import { UnitsService } from '../../Services/units.service';

@Component({
	selector: 'kt-product',
	templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
	Productform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	UnitList = [];
	BrandLIst = [];
	files: any = null;
	uploadfile: any;
	CategoryList:any [] = [];

	constructor(private fb: FormBuilder, private _common: CommonService, private _ProductService: ProductService,private _CategoryService: CategoryService,
		public dialogref: MatDialogRef<ProductComponent>, private _UnitService: UnitsService, private _BrandService: BrandsService,
		@Inject(MAT_DIALOG_DATA) public data: Product,private router : Router) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.getUnit();
		await this.getBrand();
		await this.getAllCategory();
	}

	InitilizeForm() {
		this.Productform = this.fb.group({
			'productName': ['', Validators.required],
			'saleAble': ['', Validators.required],
			'brandId': ['', Validators.required],
			'categoryId': [''],
			'unitId': ['', Validators.required],
			'id': ['', Validators.required],
			'files': ['', Validators.required],
		});
		this.Productform.controls['saleAble'].setValue(false);
	}
	async getAllCategory() {
		this._CategoryService.getCategoryByType(1)
			.subscribe(res => {
				this.CategoryList = res as [];
			});
	}
	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Productform.controls['productName'].setValue(this.data.productName);
			this.Productform.controls['saleAble'].setValue(this.data.salable);
			this.Productform.controls['brandId'].setValue(this.data.brandId);
			this.Productform.controls['categoryId'].setValue(this.data.categoryId);
			this.Productform.controls['unitId'].setValue(this.data.unitId);
			this.Productform.controls['files'].setValue(this.data.image);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}
	onSelect($event) {
		this.uploadfile = [];
		this.uploadfile.push($event.target.files[0]);
		if (this.uploadfile.length > 1) {
		  alert('Only 1 Image Is Allowed..')
		  return;
		}
		else {
			this.files = this.uploadfile[0];
		}
	  }
	async getUnit() {
		this._UnitService.getAllUnits().subscribe(res => {
			this.UnitList = res as [];
		})
	}

	async getBrand() {
		this._BrandService.getAllBrands().subscribe(res => {
			this.BrandLIst = res as [];
		})
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Productform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.Productform.controls['id'].setValue(this.data.id)
		this._ProductService.EditProduct(this.files,this.Productform.value, this.getheader()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
			this.close()
		});
	}

	onSubmit() {
		debugger
		this._ProductService.SaveProduct(this.files,this.Productform.value, this.getheader()).subscribe(res => {
			console.log(res);
			this.close();
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		});

	}

	getheader() {
		let headers = localStorage.getItem("Authorization")
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem("Authorization"),
			}),
		};
		return httpOptions;
	}

	close() {
		this.dialogref.close();
	}
}


