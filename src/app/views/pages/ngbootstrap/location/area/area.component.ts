import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Area } from '../../../models/area';
import { CommonService } from '../../../Services/common.service';
import { AreaService } from './area.service';

@Component({
	selector: 'kt-area',
	templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {
	Areaform: FormGroup;
	CityList = [];
	hideupdate: boolean;
	hide: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<AreaComponent>, private _area: AreaService,
		@Inject(MAT_DIALOG_DATA) public data: Area) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.getAllCity();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Areaform = this.fb.group({
			'area': ['', Validators.required],
			'cityId': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Areaform.controls['area'].setValue(this.data.area);
			this.Areaform.controls['cityId'].setValue(this.data.cityId);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Areaform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	async getAllCity() {
		this._common.getAllCity().subscribe(data => {
			this.CityList = data as [];
		})
	}

	UPdate() {
		this.Areaform.controls['id'].setValue(this.data.id)
		this._common.EditArea(this.Areaform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._area.SaveArea(this.Areaform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}
}
