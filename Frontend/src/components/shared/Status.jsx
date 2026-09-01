// Status.jsx — Premium status badge helper.
// Used in ProductViewModal for In Stock / Out of Stock display.
// Styling improved: tighter badge, uppercase, letter-spaced, icon after text.

const Status = ({ text, icon: Icon, bg, color, className }) => {
  return (
    <div
      className={
        className ||
        `inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] ${bg} ${color}`
      }
    >
      <span>{text}</span>
      {Icon && <Icon size={13} strokeWidth={2} />}
    </div>
  );
};

export default Status;