import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// This Module's Components
import { BranchComponent } from './branch.component';

@NgModule({
    imports: [
        ReactiveFormsModule, FormsModule, CommonModule
    ],
    declarations: [
        BranchComponent,
    ],
    exports: [
        BranchComponent,
    ]
})
export class BranchModule {

}
