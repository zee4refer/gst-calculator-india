"""GST calculator for India (add or remove GST, CGST/SGST or IGST split). MIT licence.

https://billingbazaar.in/tools/gst-calculator/
"""
from decimal import Decimal, ROUND_HALF_UP


def _r(x: Decimal) -> Decimal:
    return x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def gst(amount, rate, mode: str = "add", inter_state: bool = False) -> dict:
    """Return base, gst, total and the CGST/SGST (same state) or IGST (other state) split."""
    amount, rate = Decimal(str(amount)), Decimal(str(rate))
    if amount < 0 or rate < 0:
        raise ValueError("amount and rate must be >= 0")
    base = amount * 100 / (100 + rate) if mode == "remove" else amount
    tax = _r(base * rate / 100)
    out = {"base": _r(base), "gst": tax, "total": _r(base) + tax, "rate": rate}
    if inter_state:
        out["igst"] = tax
    else:
        paise = int(tax * 100)
        out["cgst"] = Decimal(-(-paise // 2)) / 100
        out["sgst"] = Decimal(paise // 2) / 100
    return out


if __name__ == "__main__":
    print(gst(1000, 18))
    print(gst(1180, 18, mode="remove"))
    print(gst(1000, 5, inter_state=True))
