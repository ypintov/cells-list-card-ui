import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './CellsListCardUi-styles.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<cells-list-card-ui></cells-list-card-ui>
```

##styling-doc

@customElement cells-list-card-ui
*/
export class CellsListCardUi extends LitElement {
  static get is() {
    return 'cells-list-card-ui';
  }

  // Declare properties
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.data = [];
  }

  _fire(nameEvent, detail) {
    const val = typeof detail === 'undefined' ? null : detail;
    this.dispatchEvent(
      new CustomEvent(nameEvent, {
        composed: true,
        bubbles: true,
        detail: val,
      })
    );
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-list-card-ui-shared-styles'),
    ];
  }

  _onViewDetail(card) {
    const payload = { id: card.id };
    this._fire('view-detail-card', payload);
  }

  _formatAmount(currency, amount) {
    switch (currency) {
      case 'PEN':
        return `S/ ${Number(amount).toFixed(2)}`;
      case 'USD':
        return `$ ${Number(amount).toFixed(2)}`;
      case 'EUR':
        return `€ ${Number(amount).toFixed(2)}`;
      default:
        return '';
    }
  }

  // Define a template
  render() {
    return html`
      <div class="container">
        <div class="cards">
          <div class="cards__header">Mis Tarjetas</div>

          ${
            this.data.length === 0
              ? html`<div class="cards__list--empty">No tienes tarjetas.</div>`
              : html`<div class="cards__list">
                  <div class="cards__list-item cards-list-item">
                    ${this.data.map(
                      (card) => html`<div class="cards-list-item__detail">
                        <bbva-web-card-product
                          subheading=${card.productName}
                          button-text="Ver detalle"
                          @button-click=${() => this._onViewDetail(card)}
                          badge-text="Tarjeta"
                        >
                          <bbva-web-list-item-bullet slot="option">
                            Numero de cuenta: ${card.number}
                          </bbva-web-list-item-bullet>

                          <bbva-web-list-item-bullet slot="option">
                            Línea de crédito:
                            ${this._formatAmount(
                              card.currency,
                              card.amountGranted
                            )}
                          </bbva-web-list-item-bullet>
                          <bbva-web-list-item-bullet slot="option">
                            Línea disponible:
                            ${this._formatAmount(
                              card.currency,
                              card.amountAvailable
                            )}
                          </bbva-web-list-item-bullet>
                        </bbva-web-card-product>
                      </div>`
                    )}
                  </div>
                </div>`
          }
          </div>
        </div>
      </div>
    `;
  }
}
