import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompanyPaidPayment } from '../../models/companypaidpament';
import { AccounttypeService } from '../../Services/accounttype.service';
import { BankService } from '../../Services/bank.service';
import { BankaccountService } from '../../Services/bankaccount.service';
import { CommonService } from '../../Services/common.service';
import { CompanypaidpaymentService } from '../../Services/companypaidpayment.service';
import { VendorService } from '../../Services/vendor.service';
import { BranchService } from '../../user-management/branch/branch.service';

@Component({
	selector: 'kt-companypaidpayments',
	templateUrl: './companypaidpayments.component.html',
	styleUrls: ['./companypaidpayments.component.scss']
})
export class CompanypaidpaymentsComponent implements OnInit {
	CompanyPaidform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	BankArray = [];
	CashArray = [];
	ChequeArray = [];

	@ViewChild('wizard', { static: true }) el: ElementRef;

	/////////// Bank Transaction ////////////
	@ViewChild('circleno', { static: true }) circleno: ElementRef;
	@ViewChild('percenatage', { static: true }) percenatage: ElementRef;
	@ViewChild('transferType', { static: true }) transferType: ElementRef;
	@ViewChild('type', { static: true }) type: ElementRef;
	@ViewChild('bankIdCompany', { static: true }) bankIdCompany: ElementRef;
	@ViewChild('branchIdCompany', { static: true }) branchIdCompany: ElementRef;
	@ViewChild('accountIdCompany', { static: true }) accountIdCompany: ElementRef;
	@ViewChild('venBankId', { static: true }) venBankId: ElementRef;
	@ViewChild('venBranchId', { static: true }) venBranchId: ElementRef;
	@ViewChild('venAccountId', { static: true }) venAccountId: ElementRef;
	@ViewChild('bankTransactionType', { static: true }) bankTransactionType: ElementRef;
	@ViewChild('amountTransfer', { static: true }) amountTransfer: ElementRef;

	/////////// Cash Transaction ////////////
	@ViewChild('transferAmount', { static: true }) transferAmount: ElementRef;

	/////////// Cheque Transaction ////////////
	@ViewChild('transferamount', { static: true }) transferamount: ElementRef;
	@ViewChild('recieved_cheque', { static: true }) recieved_cheque: ElementRef;
	@ViewChild('new_cheque', { static: true }) new_cheque: ElementRef;
	@ViewChild('both_cheque', { static: true }) both_cheque: ElementRef;
	@ViewChild('companyAccountId', { static: true }) companyAccountId: ElementRef;
	@ViewChild('chequeId', { static: true }) chequeId: ElementRef;
	@ViewChild('accountId', { static: true }) accountId: ElementRef;
	@ViewChild('chequeNumber', { static: true }) chequeNumber: ElementRef;
	@ViewChild('chequeStatus', { static: true }) chequeStatus: ElementRef;
	@ViewChild('Chtype', { static: true }) Chtype: ElementRef;
	@ViewChild('amount', { static: true }) amount: ElementRef;
	@ViewChild('bankAccountId', { static: true }) bankAccountId: ElementRef;


	VendorList = [];
	BankList = [];
	AccountList = [];
	ChequeList = [];
	AccountPayableList = []
	BranchList = [];
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CompanypaidpaymentsComponent>,
		private _CompanypaidpaymentService: CompanypaidpaymentService,
		private _vendorService: VendorService,
		private _Bank: BankService,
		private _Branch: BranchService,
		private _Account: BankaccountService,
		private _AccountType: AccounttypeService,
		@Inject(MAT_DIALOG_DATA) public data: CompanyPaidPayment) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getAccountPayableGen();
		await this.getBank();
		await this.getBankAccount();
		await this.getBranch();
		await this.getCheque();
		await this.GetVendor();
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
		this.CompanyPaidform = this.fb.group({
			'id': ['', Validators.required],
			'accountPayableGenericId': ['', Validators.required],
			'vendorId': ['', Validators.required],
			'amount': ['', Validators.required],
			'bankTransaction': ['', Validators.required],
			'cashTransaction': ['', Validators.required],
			'checqueTransaction': ['', Validators.required],

			'bankTransactionList': ['', Validators.required],
			'cashTransactionList': ['', Validators.required],
			'chequeTransactionList': ['', Validators.required],


		});
	}
	async Edit() {

	}
	async EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.CompanyPaidform.controls['circles'].setValue(this.data.id);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	onSubmit() {

		this.CompanyPaidform.controls['bankTransactionList'].setValue(this.BankArray);
		this.CompanyPaidform.controls['cashTransactionList'].setValue(this.CashArray);
		this.CompanyPaidform.controls['chequeTransactionList'].setValue(this.ChequeArray);
		console.log(this.CompanyPaidform.value)

		this._CompanypaidpaymentService.PostPayment(this.CompanyPaidform.value, this._common.getHeaerOptions()).subscribe(res => {
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

	async getAccountPayableGen() {
		this._CompanypaidpaymentService.GetAccountPayableGen().subscribe(res => {
			this.AccountPayableList = res as [];
		})
	}
	async GetVendor() {
		this._vendorService.GetALLvendor().subscribe(res => {
			this.VendorList = res as [];
		})
	}

	async getBank() {
		this._Bank.getAllBank().subscribe(res => {
			this.BankList = res as [];
		})
	}

	async getBranch() {
		this._Branch.getAllBranch().subscribe(res => {
			this.BranchList = res as [];
		})
	}

	async getBankAccount() {
		this._Account.getAllbankaccount().subscribe(res => {
			this.AccountList = res as [];
		})
	}

	async getCheque() {
		this._CompanypaidpaymentService.GetCheque().subscribe(res => {
			this.ChequeList = res as [];
		})
	}
	async AddBankArray() {
		this.BankArray.push({
			transferType: this.transferType.nativeElement.value,
			type: this.type.nativeElement.value,
			bankIdCompany: Number(this.bankIdCompany.nativeElement.value),
			branchIdCompany: Number(this.branchIdCompany.nativeElement.value),
			accountIdCompany: Number(this.accountIdCompany.nativeElement.value),
			venBankId: Number(this.venBankId.nativeElement.value),
			venBranchId: Number(this.venBranchId.nativeElement.value),
			venAccountId: Number(this.venAccountId.nativeElement.value),
			bankTransactionType: this.bankTransactionType.nativeElement.value,
			amountTransfer: Number(this.amountTransfer.nativeElement.value),
		});

	}

	async SpliceBankArray(item) {
		this.BankArray.splice(item, 1);

	}

	async AddCashArray() {
		this.CashArray.push({
			transferAmount: Number(this.transferAmount.nativeElement.value),
		});
	}

	async SpliceCashArray(item) {
		this.CashArray.splice(item, 1);

	}

	async AddCheuqArray() {
		this.ChequeArray.push({
			transferamount: Number(this.transferAmount.nativeElement.value),
			recieved_cheque: this.recieved_cheque.nativeElement.value,
			new_cheque: this.new_cheque.nativeElement.value,
			both_cheque: this.both_cheque.nativeElement.value,
			companyAccountId: Number(this.transferAmount.nativeElement.value),
			chequeId: Number(this.transferAmount.nativeElement.value),
			accountId: Number(this.transferAmount.nativeElement.value),
			listOfCheck: [{
				chequeNumber: Number(this.chequeNumber.nativeElement.value),
				chequeStatus: this.chequeStatus.nativeElement.value,
				type: this.Chtype.nativeElement.value,
				amount: Number(this.amount.nativeElement.value),
				bankAccountId: Number(this.bankAccountId.nativeElement.value),
			}]
		});
	}

	async SpliceChequeArray(item) {
		this.ChequeArray.splice(item, 1);

	}
}


