import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'inventory',
	templateUrl: 'inventory.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {

}
