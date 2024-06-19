import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-week-selector',
  template: `
    <div class="col-auto">
      <small>Select Week</small>
    </div>
    <div class="col-auto d-flex align-items-center" style="gap: 20px">
      <input type="date" class="form-control datepickder-input" (change)="onWeekChange($event)"/>
      <small>From: {{ (selectedWeek?.start | date: 'mediumDate') || '-' }}</small>
      <small>to: {{ (selectedWeek?.end | date: 'mediumDate') || '-'}}</small>
    </div>
    <div class="col-auto d-flex align-items-center" style="gap: 20px">
      <small>From: <input type="date" class="form-control datepickder-input"
                          (change)="onStartDateChange($event)"/>
      </small>
      <small>to: <input type="date" class="form-control datepickder-input"
                        (change)="onEndDateChange($event)"/>
      </small>
    </div>
  `
})
export class WeekSelectorComponent {
  @Input() selectedWeek: any;
  @Output() weekChange = new EventEmitter<any>();
  @Output() startDateChange = new EventEmitter<any>();
  @Output() endDateChange = new EventEmitter<any>();

  onWeekChange(event: any) {
    this.weekChange.emit(event);
  }

  onStartDateChange(event: any) {
    this.startDateChange.emit(event);
  }

  onEndDateChange(event: any) {
    this.endDateChange.emit(event);
  }
}
