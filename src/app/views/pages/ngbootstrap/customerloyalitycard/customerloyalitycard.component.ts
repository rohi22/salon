import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoyalityCard } from '../../models/loyalitycard';
import { CommonService } from '../../Services/common.service';
import { LoyalitycardService } from '../../Services/loyalitycard.service';

@Component({
  selector: 'kt-customerloyalitycard',
  templateUrl: './customerloyalitycard.component.html',
  styleUrls: ['./customerloyalitycard.component.scss']
})
export class CustomerloyalitycardComponent implements OnInit,AfterViewInit {
	LoyaltiCardform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	PercentageArray = [];
	@ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('circleno', { static: true }) circleno: ElementRef;
	@ViewChild('percenatage', { static: true }) percenatage: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CustomerloyalitycardComponent>,
		private _LoyalitycardService: LoyalitycardService,
		@Inject(MAT_DIALOG_DATA) public data: LoyalityCard) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
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
		this.LoyaltiCardform = this.fb.group({
			'id': ['', Validators.required],
			'percentageList': ['', Validators.required],
			'circles': ['', Validators.required],
		});
	}

	async EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.LoyaltiCardform.controls['circles'].setValue(this.data.circles);
			this.PercentageArray = this.data.percentageList;
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		this.LoyaltiCardform.controls['id'].setValue(this.data.id)
		this.LoyaltiCardform.controls['percentageList'].setValue(this.PercentageArray);
		this._LoyalitycardService.PutCustomerLoyalityCard(this.LoyaltiCardform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this.LoyaltiCardform.controls['percentageList'].setValue(this.PercentageArray);

		console.log(this.LoyaltiCardform.value)
		this._LoyalitycardService.PostCustomerLoyalityCard(this.LoyaltiCardform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
			console.log(err);
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}

	async AddPercentageLists() {

		this.PercentageArray.push({
			circleNo: Number(this.circleno.nativeElement.value),
			percentage:  Number(this.percenatage.nativeElement.value)
		});
		this.percenatage.nativeElement.setValue("");
		this.circleno.nativeElement.setValue("");
	}

	async SplicePercentageArray(item) {
		this.PercentageArray.splice(item, 1);

	}
}

