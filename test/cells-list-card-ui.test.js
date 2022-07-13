/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../cells-list-card-ui.js';
import sinon from 'sinon';

suite('CellsListCardUi', () => {
  let el;

  teardown(() => fixtureCleanup());

  let data = [
    {
      id: 'czJUS1BMTVg5YmpTdlJHbQ',
      number: '4919108224726441',
      currency: 'PEN',
      productName: 'VISA CERO',
      amountGranted: 2834.14,
      amountAvailable: 0.0,
    },

    {
      id: 'UGltw5E0NUFKc1Zjb2F2enQ',
      number: '4919108224726433',
      currency: 'PEN',
      productName: 'VISA CLASICA',
      amountGranted: 1000.0,
      amountAvailable: 50.0,
    },
  ];

  setup(async () => {
    el = await fixture(
      html`<cells-list-card-ui .data=${data}></cells-list-card-ui>`
    );
    await el.updateComplete;
  });

  test('Method _formatAmount', async () => {
    el._formatAmount('PEN', 100);
  });

  test('Method _formatAmount', async () => {
    el._formatAmount('USD', 100);
  });

  test('Method _formatAmount', async () => {
    el._formatAmount('EUR', 100);
  });

  test('Method _formatAmount', async () => {
    el._formatAmount('', 0);
  });

  test('Method _onViewDetail', async () => {
    const spy = sinon.spy();
    el.addEventListener('view-detail-card', spy);
    el._onViewDetail({ id: 'czJUS1BMTVg5YmpTdlJHbQ' });
    assert.isTrue(spy.called);
  });

  test('onClick _onViewDetail', async () => {
    let elementCard = el.shadowRoot.querySelector('bbva-web-card-product');
    const buttonCard = elementCard.shadowRoot.querySelector(
      'bbva-web-button-default'
    );
    buttonCard.click();
  });

  test('Method _fire', async () => {
    const payload = { id: 'czJUS1BMTVg5YmpTdlJHbQ' };
    el._fire('view-detail-card', payload);
  });

  test('Method _fire', async () => {
    el._fire('view-detail-card', undefined);
  });

  test('change  data', async () => {
    el.data = [];
  });
});
