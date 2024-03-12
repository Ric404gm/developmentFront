

/**
 * Interface used to display a search dialog.
 *
 * @export
 * @interface SearchDialogInterface
 */
export interface SearchDialogInterface {
	/**
	 * Component's header.
	 *
	 * @type {string}
	 * @memberof SearchDialogInterface
	 */
	header?: string;

	/**
	 * Horizontal list's title.
	 *
	 * @type {(string)}
	 * @memberof SearchDialogInterface
	 */
	titleList?: string;

	/**
	 * Title of the vertical contact list.
	 *
	 * @type {(string | number)}
	 * @memberof SearchDialogInterface
	 */
	titleListPayees?: string;

	/**
	 * Array of credits.
	 *
	 * @type {Array<Credit>}
	 * @memberof SearchDialogInterface
	 */
	credits?: Array<any>;

	/**
	 * Title span of credits.
	 *
	 * @type {string}
	 * @memberof SearchDialogInterface
	 */
	titleListCredits?: string;
	
	confirmEvent?: (selected: any) => void;
}
