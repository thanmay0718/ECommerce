const BackDrop = ({ onClick }) => {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className="fixed inset-0 z-40 bg-premium-charcoal/10 backdrop-blur-[2px] transition-opacity duration-200"
    />
  );
};

export default BackDrop;
