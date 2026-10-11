# GST calculator for India (JavaScript + Python)

Add GST to a price or remove GST from a GST-inclusive price, with the **CGST + SGST** (same state) or **IGST** (other state) split. No dependencies, works in Node, the browser and Python. Uses the current slabs (0.25%, 3%, 5%, 18%, 40%) or any custom rate.

Try it online, no install: **[billingbazaar.in/tools/gst-calculator/](https://billingbazaar.in/tools/gst-calculator/)**

## Usage

### JavaScript

```js
const { gst } = require('./gst');

gst(1000, 18);                     // { base: 1000, gst: 180, total: 1180, cgst: 90, sgst: 90 }
gst(1180, 18, { mode: 'remove' });  // { base: 1000, gst: 180, total: 1180, ... }
gst(1000, 5, { interState: true });  // { ..., igst: 50 }
```

### Python

```python
from gst import gst
gst(1000, 18)                    # base 1000.00, gst 180.00, total 1180.00, cgst 90.00, sgst 90.00
gst(1180, 18, mode="remove")     # base 1000.00
gst(1000, 5, inter_state=True)   # igst 50.00
```

### In the browser

Open `index.html` – a small calculator page using `gst.js`.

## How GST is worked out

| Mode | Formula |
|---|---|
| Add GST | GST = amount × rate / 100, total = amount + GST |
| Remove GST | base = amount × 100 / (100 + rate), GST = amount − base |

Within the same state the GST is split equally into CGST and SGST (any odd paisa goes to CGST, so the two always add up). For another state the whole GST is IGST.

## Tests

```bash
node test.js
python3 gst.py
```

## GST on every bill, without a calculator

This library is handy for code and quick checks. A shop billing every day needs the same maths on every invoice:
the right rate per item, CGST + SGST or IGST from the place of supply, and the totals ready for GSTR-1 and GSTR-3B.
Billing apps such as **Vyapar** do this as you bill – save each item's GST rate once and every invoice is worked out
for you ([how a GST invoice is made in Vyapar](https://billingbazaar.in/guides/how-to-create-gst-invoice-in-vyapar/),
[GSTR-1 report](https://billingbazaar.in/guides/how-to-generate-gstr-1-report-in-vyapar/)).

Starting with Vyapar? Sign up with referral code **`NXW3QY`** as a new user, or get it set up for you with a [free demo and installation](https://billingbazaar.in/vyapar-referral-code/) in Hindi or English.

---

Made by [Billing Bazaar](https://billingbazaar.in) – billing software demos, setup and free GST tools for Indian shops and traders.
[All free tools](https://billingbazaar.in/tools/) · [Vyapar guides](https://billingbazaar.in/guides/)

*Not affiliated with the GST Network (GSTN), CBIC or NPCI. Vyapar is a trademark of Simply Vyapar Apps Pvt. Ltd.;
Billing Bazaar is a Vyapar partner. Always confirm GST rates and rules on the official GST portal.*
