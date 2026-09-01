// SetQuantity.jsx — Premium quantity stepper
// Styling only — no logic changes.

const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center gap-4">
      {!cardCounter && (
        <div className="text-[10px] font-bold uppercase tracking-widest text-premium-muted">
          Quantity
        </div>
      )}

      <div className="inline-flex items-center rounded-lg border border-premium-border bg-premium-bg shadow-sm overflow-hidden">
        {/* DECREASE */}
        <button
          type="button"
          disabled={Number(quantity) <= 1}
          onClick={handleQtyDecrease}
          className="
            flex h-9 w-9 items-center justify-center
            text-sm font-bold text-premium-charcoal
            border-r border-premium-border
            transition-all duration-150
            hover:bg-premium-charcoal hover:text-white
            active:scale-95
            disabled:cursor-not-allowed disabled:opacity-30
            disabled:hover:bg-transparent disabled:hover:text-premium-charcoal
            cursor-pointer
          "
        >
          −
        </button>

        {/* QUANTITY DISPLAY */}
        <div className="flex h-9 min-w-[2.75rem] items-center justify-center bg-premium-card px-3 text-sm font-bold tracking-wider text-premium-charcoal tabular-nums select-none">
          {quantity}
        </div>

        {/* INCREASE */}
        <button
          type="button"
          onClick={handleQtyIncrease}
          className="
            flex h-9 w-9 items-center justify-center
            text-sm font-bold text-premium-charcoal
            border-l border-premium-border
            transition-all duration-150
            hover:bg-premium-charcoal hover:text-white
            active:scale-95
            cursor-pointer
          "
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;