import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { DialogConfigInterface } from 'src/app/components/dialog-web/interface/dialog-config.interface';


/**
 * Service that provides a way to open floating panels on the screen.
 *
 * @export
 * @class OverlayService
 */
@Injectable({
	providedIn: 'root'
})
export class OverlayService {
	/**
	 * Creates an instance of OverlayService.
	 *
	 * @param {Overlay} _overlayServiceCDK - Instance to the overlays creation service.
	 * @memberof OverlayService
	 */
	constructor(private _overlayServiceCDK: Overlay) {}

	/**
	 * Get the overlay settings.
	 *
	 * @private
	 * @param {DialogConfigInterface} config - Data needed to create a Dialog.
	 * @returns {OverlayConfig} - Return a configuration used when creating an overlay.
	 * @memberof OverlayService
	 */
	private getOverlayConfig(config: DialogConfigInterface): OverlayConfig {
		const positionStrategy = this._overlayServiceCDK
			.position()
			.global()
			.centerHorizontally()
			.bottom();

		const overlayConfig = new OverlayConfig({
			hasBackdrop: config.hasBackdrop,
			backdropClass: config.backdropClass,
			panelClass: config.panelClass,
			scrollStrategy: this._overlayServiceCDK.scrollStrategies.block(),
			positionStrategy
		});

		return overlayConfig;
	}

	/**
	 * Function that creates an overlay with a configuration obtained.
	 *
	 * @param {*} config - Save the configuration that the overlay will have.
	 * @returns {OverlayRef} - Return an OverlayRef instance.
	 * @memberof OverlayService
	 */
	public createOverlay(config: any): OverlayRef {
		// TODO: create a interfsace for OverlayConfig
		const overlayConfig: OverlayConfig = this.getOverlayConfig(config);
		return this._overlayServiceCDK.create(overlayConfig);
	}
}
