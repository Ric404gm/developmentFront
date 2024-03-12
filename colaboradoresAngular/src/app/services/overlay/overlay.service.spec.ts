import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { DialogConfig } from '../../atoms/dialog/dialog.service';

describe('Overlay Service', () => {
	let service: OverlayService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [ NO_ERRORS_SCHEMA ],
			declarations: [],
			providers: [OverlayService, Overlay]
		}).compileComponents();
	}));

	beforeEach(() => {
		service = TestBed.get(OverlayService);
	})

	it('should create Service', () => {
		expect(service).toBeTruthy();
	});

	it('should create Overlay', () => {
		const config: DialogConfig = {
            title: '',
            hasBackdrop: false,
            backdropClass: '',
            panelClass: ''
		}
		expect(service.createOverlay(config)).toEqual(jasmine.any(OverlayRef));
	});
});
