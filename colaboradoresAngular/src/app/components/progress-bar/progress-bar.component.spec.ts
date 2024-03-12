import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProgressBarComponent', () => {
	let component: ProgressBarComponent;
	let fixture: ComponentFixture<ProgressBarComponent>;
	let progressEl: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProgressBarComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProgressBarComponent);
		component = fixture.componentInstance;
		progressEl = fixture.debugElement.query(By.css('.sn-progress-bar'));
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('value Input get', () => {
		expect(component.value).toBe(component.value);
	});

	it('value Input set', () => {
		let value = '0.5'
		component.value = value;
		expect(component.value).toBe(value);
		expect(component.percentage).toBe(Number(value)*100);
		value = '55';
		component.value = value;
		expect(component.percentage).toBe(Number(value));
	});

	it('ngOnInit with inderterminate undefined', () => {
		component.ngOnInit();
		expect(component.indeterminate).toBeFalsy();
	});

	it('ngOnInit with indeterminate true', () => {
		component.indeterminate = true;
		component.ngOnInit();
		expect(component.indeterminate).toBeTruthy();
	});

	it('ngOnInit with indeterminate false', () => {
		component.indeterminate = false;
		component.ngOnInit();
		expect(component.indeterminate).toBeTruthy();
	});

	it('should change value', () => {
		component.value = '56';
		fixture.detectChanges();
		expect(progressEl.nativeElement.style.width).toBe('56%');
	});

	it('should set class indeterminate', () => {
		component.indeterminate = true;
		fixture.detectChanges();
		expect(progressEl.nativeElement.classList).toContain(
			'sn-progress-bar-indeterminate'
		);
	});
});
