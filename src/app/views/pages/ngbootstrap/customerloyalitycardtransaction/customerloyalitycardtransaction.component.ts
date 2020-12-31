import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoyalityCard } from '../../models/loyalitycard';
import { CommonService } from '../../Services/common.service';
import { LoyalitycardService } from '../../Services/loyalitycard.service';
import { BatchComponent } from '../employee/batch/batch.component';

@Component({
	selector: 'kt-customerloyalitycardtransaction',
	templateUrl: './customerloyalitycardtransaction.component.html',
	styleUrls: ['./customerloyalitycardtransaction.component.scss']
})
export class CustomerloyalitycardtransactionComponent implements OnInit {
	LoyalitycardTranstionform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	CardList = []

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<BatchComponent>, private _LoyalitycardService: LoyalitycardService,
		@Inject(MAT_DIALOG_DATA) public data: LoyalityCard) { }

	async ngOnInit() {
		await this.getCard();
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.LoyalitycardTranstionform = this.fb.group({
			'usedBy': ['', Validators.required],
			'usedDate': ['', Validators.required],
			'cardNo': ['', Validators.required],
			'cardId': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			// this.LoyalitycardTranstionform.controls['usedBy'].setValue(this.data.description);
			// this.LoyalitycardTranstionform.controls['usedDate'].setValue(this.data.startingTime);
			// this.LoyalitycardTranstionform.controls['cardNo'].setValue(this.data.endingTime);
			// this.LoyalitycardTranstionform.controls['cardId'].setValue(this.data.bufferTime);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		// this.LoyalitycardTranstionform.controls['id'].setValue(this.data.id)
		// this._LoyalitycardService.PutCustomerLoyalityCard(this.LoyalitycardTranstionform.value, this._common.getHeaerOptions()).subscribe(res => {
		// 	console.log(res);
		// 	alert("Update")
		// 	this.close()
		// }, (error: HttpErrorResponse) => {
		// 	console.log(error);
		// 	alert(error)
		// 	this.close()
		// });
	}

	onSubmit() {
		console.log(this.LoyalitycardTranstionform.value);
		this._LoyalitycardService.PostLoyalityCardTransaction(this.LoyalitycardTranstionform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Save");
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}

	async getCard() {
		this._LoyalitycardService.GetCustomerLoyalityCard().subscribe(res => {
			this.CardList = res as [];
		})
	}
}
