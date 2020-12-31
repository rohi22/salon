import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeAlownces } from '../../../models/employeealoownce';
import { AllowancesService } from '../../../Services/allowances.service';
import { CommonService } from '../../../Services/common.service';

@Component({
	selector: 'kt-employeeallownce',
	templateUrl: './employeeallownce.component.html',
	styleUrls: ['./employeeallownce.component.scss']
})
export class EmployeeallownceComponent implements OnInit, AfterViewInit {
	Allownceform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	@ViewChild('wizard', { static: true }) el: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<EmployeeallownceComponent>, private _AllowancesService: AllowancesService,
		@Inject(MAT_DIALOG_DATA) public data: EmployeeAlownces) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	ngAfterViewInit(): void {
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
		});

		wizard.on('beforeNext', (wizardObj) => {
		});
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}


	InitilizeForm() {
		this.Allownceform = this.fb.group({
			'allowanceName': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Allownceform.controls['allowanceName'].setValue(this.data.allowanceName);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		this.Allownceform.controls['id'].setValue(this.data.id)
		this._AllowancesService.EditAllownces(this.Allownceform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._AllowancesService.SaveAllownces(this.Allownceform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}
}
