import { Tax } from './../../models/Tax';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { BrandsService } from '../../Services/brands.service';
import { CommonService } from '../../Services/common.service';
import { ProductService } from '../../Services/product.service';
import { UnitsService } from '../../Services/units.service';
import { ProductComponent } from '../../ngbootstrap/product/product.component';
import { TaxService } from '../../Services/tax.service';

@Component({
	selector: 'kt-product',
	templateUrl: './add-tax.component.html',
	styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit {
	Productform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	UnitList = [];
	BrandLIst = [];
	files: any = null;
	uploadfile: any;

	constructor(private fb: FormBuilder, private _common: CommonService, private _TaxService: TaxService,
		public dialogref: MatDialogRef<AddTaxComponent>, private _UnitService: UnitsService, private _BrandService: BrandsService,
		@Inject(MAT_DIALOG_DATA) public data: Tax,private router : Router) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.getUnit();
		await this.getBrand();
	}

	InitilizeForm() {
		this.Productform = this.fb.group({
			'title': ['', Validators.required],
			'description': ['', Validators.required],
			'percentage': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Productform.controls['title'].setValue(this.data.title);
			this.Productform.controls['percentage'].setValue(this.data.percentage);
			this.Productform.controls['description'].setValue(this.data.description);
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
		this._TaxService.EditTax(this.Productform.controls['id'].value,this.Productform.value, this.getheader()).subscribe(res => {
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

		this._TaxService.SaveTax(this.Productform.value, this.getheader()).subscribe(res => {
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


