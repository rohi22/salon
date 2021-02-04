import { HttpErrorResponse} from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../../models/Category';
import { CategoryService } from '../../Services/product.service';


@Component({
	selector: 'kt-product',
	templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
	Productform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	UnitList = [];
	BrandLIst = [];
	files: any = null;
	uploadfile: any;
	catType:boolean = false;

	constructor(private fb: FormBuilder, private _CategoryService: CategoryService,public dialogref: MatDialogRef<CategoryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Category) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Productform = this.fb.group({
			'id': ['', Validators.required],
			'type': ['', Validators.required],
			'title': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Productform.controls['id'].setValue(this.data.id);
			this.Productform.controls['title'].setValue(this.data.title);
			this.Productform.controls['type'].setValue(this.data.type);
			this.catType = this.data.type == 1? false : this.data.type == 2? true : false;
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
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
		this._CategoryService.updateCategory(this.Productform.controls['id'].value, this.Productform.value).subscribe(res => {
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
		let check = this.catType? 2 : 1;
		this.Productform.controls['type'].setValue(check);
		this._CategoryService.addCategory(this.Productform.value).subscribe(res => {
			console.log(res);
			this.close();
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		});

	}
	close() {
		this.dialogref.close();
	}
}


