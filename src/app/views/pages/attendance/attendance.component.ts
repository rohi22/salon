import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'attendance',
	templateUrl: 'attendance.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceComponent {

}
