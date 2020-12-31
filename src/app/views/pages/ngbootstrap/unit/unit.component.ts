import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Unit } from '../../models/unit';
import { CommonService } from '../../Services/common.service';
import { UnitsService } from '../../Services/units.service';

@Component({
	selector: 'kt-unit',
	templateUrl: './unit.component.html'
})
export class UnitComponent implements OnInit {
	Unitform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService, private _UnitsService: UnitsService,
		public dialogref: MatDialogRef<UnitComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Unit) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Unitform = this.fb.group({
			'unitName': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Unitform.controls['unitName'].setValue(this.data.unitName);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Unitform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}



	UPdate() {
		this.Unitform.controls['id'].setValue(this.data.id)
		this._UnitsService.EditUNit(this.Unitform.value, this.getheader()).subscribe(res => {
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
		this._UnitsService.SaveUNit(this.Unitform.value, this.getheader()).subscribe(res => {
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

