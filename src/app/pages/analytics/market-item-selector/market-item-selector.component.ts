import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-market-item-selector',
    template: `
        <div class="col-auto d-flex align-items-center" style="gap: 20px" (dblclick)="resetSelection()">
            <small>
                {{ label }}:
                <select class="form-select" aria-label="Default select example" [(ngModel)]="selectedItem"
                        (ngModelChange)="onItemChange($event)">
                    <option *ngFor="let item of items" [ngValue]="item">{{ getItemLabel(item) }}</option>
                </select>
            </small>
        </div>
    `
})
export class MarketItemSelectorComponent {
    @Input() items!: any[];
    @Input() selectedItem!: any;
    @Output() selectedItemChange = new EventEmitter<any>();
    @Output() itemChange = new EventEmitter<any>();
    @Input() label!: string;
    @Input() returnProperty!: string; // Nuovo input per specificare la proprietà da ritornare

    onItemChange(event: any) {
        const returnValue = event ? event[this.returnProperty] : event;
        this.itemChange.emit(returnValue);
        this.selectedItemChange.emit(returnValue); // Emit anche per two-way binding
    }

    resetSelection() {
        this.selectedItem = null;
        this.itemChange.emit('');
        this.selectedItemChange.emit(''); // Reset anche per two-way binding
    }

    getItemLabel(item: any) {
        return item.countryName || item.title || item.fornitore || item.category || item.ASIN || item.id;
    }
}
