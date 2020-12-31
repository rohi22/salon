// Angular Imports
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// This Module's Components
import { BranchlistComponent } from './branchlist.component';

@NgModule({
    imports: [
        MatPaginatorModule,
        MatSortModule,
    ],
    declarations: [
        BranchlistComponent,
    ],
    exports: [
        BranchlistComponent,
    ]
})
export class BranchlistModule {

}
