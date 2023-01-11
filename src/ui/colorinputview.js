import { View } from 'ckeditor5/src/ui';
import {jscolor} from './jscolor';

const JsColorOptions = {
	hash: true,
	borderRadius: 2,
	borderWidth: 0,
	padding: 8,
	uppercase: false,
	closable: false,
	width: 90,
    sliderSize:12,
	height: 70,
	buttonHeight: 17,
    backgroundColor:'var(--ck-color-dropdown-panel-background)',
    insetColor:'var(--ck-color-dropdown-panel-border)',
    shadow:true,
    shadowBlur:4,
    shadowColor: 'rgba(0,0,0,0.1)',
    styleElementOnClick: true,
    pointerColor: 'var(--ck-color-base-text)',
	pointerBorderColor: 'transparent',
};

export default class ColorInputView extends View {
	constructor(locale, closeButtonLabel) {
		super(locale);

		const bind = this.bindTemplate;

		this.closeButtonLabel = closeButtonLabel;

		this.set('value');
		this.set('parent');
		this.set('styleElem');

		this.setTemplate({
			tag: 'input',
			attributes: {
                type:"text",
				class: ['ck', 'ck-color-input', 'ck-color-grid__tile'],
			},
		});
	}

	setInputValue(newValue) {
        const def = getComputedStyle(document.documentElement)
            .getPropertyValue('--ck-color-button-default-hover-background') || '#000000';
		const value = !newValue ? def : newValue;
		if (this.colorPicker) {
			this.colorPicker.fromString(value);
		} else if (this.element){
			this.element.value = value;
		}
	}

	getInputValue() {
		if (this.colorPicker) {
			return this.colorPicker.toHEXString();
		} else if (this.element){
			return this.element.value;
		}
	}

	render() {
		super.render();
		this.on('change:value', (evt, name, value) => {
			this.setInputValue(value);
		});

		this.on('change:parent', (evt, name, value) => {
			let options = Object.assign({}, JsColorOptions, {
				closeText: this.closeButtonLabel,
				container: value,
			});
			this.colorPicker = new jscolor(this.element, options, this.styleElem);
			this.setInputValue(this.value);
		});
	}
}