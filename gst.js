/**
 * GST calculator for India: add GST to a price, or take GST out of a GST-inclusive price,
 * with the CGST + SGST (same state) or IGST (other state) split.
 * MIT licence – https://billingbazaar.in/tools/gst-calculator/
 */
'use strict';

function round2(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }

/**
 * @param {number} amount  price before GST (mode "add") or including GST (mode "remove")
 * @param {number} rate    GST rate in percent, e.g. 18
 * @param {object} [opts]  { mode: 'add' | 'remove', interState: boolean }
 */
function gst(amount, rate, opts) {
  opts = opts || {};
  var mode = opts.mode || 'add';
  if (!(amount >= 0) || !(rate >= 0)) throw new RangeError('amount and rate must be numbers >= 0');
  var base = mode === 'remove' ? amount * 100 / (100 + rate) : amount;
  var tax = base * rate / 100;
  var out = { base: round2(base), gst: round2(tax), total: round2(base + tax), rate: rate };
  if (opts.interState) {
    out.igst = out.gst;
  } else {
    // split in paise so CGST + SGST always adds up to the GST amount
    var paise = Math.round(out.gst * 100);
    out.cgst = Math.ceil(paise / 2) / 100;
    out.sgst = Math.floor(paise / 2) / 100;
  }
  return out;
}

module.exports = { gst: gst };
