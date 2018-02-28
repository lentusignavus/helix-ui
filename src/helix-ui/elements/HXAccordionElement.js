import { HXElement } from './HXElement';
import { KEYS } from '../util';

export class HXAccordionElement extends HXElement {
    static get is () {
        return 'hx-accordion';
    }

    static get observedAttributes () {
        return [ 'selected-panel' ];
    }

    constructor () {
        super();
        this._onPanelOpen = this._onPanelOpen.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('selected-panel');
        //this._allowMultiplePanel = !this.hasAttribute('selected-panel');
        // this.panelHeaders.forEach(header => {
        //     header.addEventListener('keyup', this._keyUp);
        //     header.addEventListener('click', this._toggle);
        // });
        this.panels.forEach(panel => {
            panel.addEventListener('open', this._onPanelOpen);
        });
        //this.addEventListener('panel-close', this._toggle);
    }

    disconnectedCallback () {
        this.panels.forEach(panel => {
            panel.removeEventListener('open', this._onPanelOpen);
        });
    }

    get panels () {
        return Array.from(this.querySelectorAll('hx-accordion-panel'));
    }

    attributeChangedCallback (attr, oldValue, newVal) {
        if (newVal !== null) {
            this._openPanel(Number(newVal));
        }

    }

    _onPanelOpen (evt) {
        let idx = this.panels.indexOf(evt.target);
        this._openPanel(idx);
    }

    _openPanel (index) {
        console.log(index);
        if (this.hasAttribute('selected-panel')) {
            this.panels.forEach((panel, idx) => {
                if (index === idx) {
                    panel.open = true;
                    panel.focus();
                } else  {
                    panel.open = false;
                    panel.shadowRoot && panel.shadowRoot.querySelector('hx-reveal').removeAttribute('open');
                    panel.blur();
                }
            });
        }
    }
    
    set selectedPanel (idx) {
        this.setAttribute('selected-panel', idx);
    }

    get selectedPanel () {
        this.getAttribute('selected-panel');
    }

}
