const assert = require('node:assert');
const test = require('node:test');
const { calculatePrice } = require('../js/app.js');

test('calculatePrice Jallo Constructed 3 Marla Double', () => {
  const result = calculatePrice('jallo', 'constructed', '3marla', 'double');
  assert.deepEqual(result, {
    total: '4,500,000',
    advance: '800,000',
    installment: '30,000'
  });
});

test('calculatePrice Jallo Constructed 2.5 Marla Single', () => {
  const result = calculatePrice('jallo', 'constructed', '2.5marla', 'single');
  assert.deepEqual(result, {
    total: '2,000,000',
    advance: '400,000',
    installment: '30,000'
  });
});

test('calculatePrice Jallo Residential 5 Marla', () => {
  const result = calculatePrice('jallo', 'residential', '5marla', 'single'); // Residential plots have no stories, we treat as single or default
  assert.deepEqual(result, {
    total: '5,500,000',
    advance: '900,000',
    installment: '40,000'
  });
});

test('calculatePrice returns null for invalid query', () => {
  const result = calculatePrice('jallo', 'residential', '10marla', 'single');
  assert.equal(result, null);
});

test('calculatePrice Gujranwala returns null', () => {
  const result = calculatePrice('gujranwala', 'constructed', '3marla', 'single');
  assert.equal(result, null);
});

