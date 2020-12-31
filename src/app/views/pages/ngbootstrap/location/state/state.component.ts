import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { State } from '../../../models/state';
import { CommonService } from '../../../Services/common.service';
import { StateService } from './state.service';
import { StatelistComponent } from './statelist/statelist.component';

@Component({
  selector: 'kt-state',
  templateUrl: './state.component.html'
})
export class StateComponent implements OnInit {
	Stateform: FormGroup;
	CountryList = [];
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<StateComponent>, private _state: StateService,
        @Inject(MAT_DIALOG_DATA) public data: State) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.getCountry();
	}

	InitilizeForm() {
		this.Stateform = this.fb.group({
			'stateName': ['', Validators.required],
			'countryId': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Stateform.controls['stateName'].setValue(this.data.stateName);
			this.Stateform.controls['countryId'].setValue(this.data.countryId);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Stateform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	async getCountry() {
		this._common.getCountry().subscribe(data => {
			this.CountryList = data as [];
		})
	}

	getheader() {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem("Authorization"),
            }),
        };

        return httpOptions;
    }

	UPdate() {
		this.Stateform.controls['id'].setValue(this.data.id)
		this._common.EditState(this.Stateform.value, this.getheader()).subscribe(res => {
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
		const form = this.Stateform.value;
	    this._state.SaveState(this.Stateform.value, this.getheader()).subscribe(res => {
	        console.log(res);
	    });
	    this.close();
	}

	close() {
		this.dialogref.close();
	}
}




