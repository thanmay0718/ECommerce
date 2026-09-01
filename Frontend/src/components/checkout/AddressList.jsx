import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";
import {
  Building2,
  MapPin,
  Globe,
  Check,
  Edit3,
  Trash2,
  Home,
} from "lucide-react";

const AddressList = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (e, address) => {
    e.stopPropagation();
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (e, address) => {
    e.stopPropagation();
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {addresses.map((address) => {
        const isSelected =
          selectedUserCheckoutAddress?.addressId === address.addressId;

        return (
          <div
            key={address.addressId}
            onClick={() => handleAddressSelection(address)}
            className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
              isSelected
                ? "border-premium-charcoal bg-premium-card ring-2 ring-premium-charcoal/10 shadow-lg shadow-black/[0.04]"
                : "border-premium-border/80 bg-premium-card hover:border-premium-charcoal/40 hover:shadow-md"
            }`}
          >
            {/* Selected Gold Pill */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    isSelected
                      ? "bg-premium-charcoal text-premium-gold"
                      : "bg-[#FAFAF9] text-premium-muted group-hover:text-premium-charcoal"
                  }`}
                >
                  <Home size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-premium-charcoal">
                    {address.buildingName || "Home Address"}
                  </h4>
                  <span className="text-[10px] font-medium text-premium-muted">
                    {address.city}, {address.state}
                  </span>
                </div>
              </div>

              {isSelected && (
                <span className="inline-flex items-center gap-1 rounded-full bg-premium-charcoal px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-premium-gold shadow-xs">
                  <Check size={11} strokeWidth={3} />
                  <span>Selected</span>
                </span>
              )}
            </div>

            {/* Address Details */}
            <div className="space-y-1.5 text-xs text-premium-charcoal/80 my-2">
              <p className="font-medium text-premium-charcoal line-clamp-1">
                {address.street}
              </p>
              <p className="text-[11px] text-premium-muted flex items-center gap-1.5">
                <MapPin size={12} className="text-premium-gold shrink-0" />
                <span>
                  {address.city}, {address.state} - {address.pincode}
                </span>
              </p>
              <p className="text-[11px] text-premium-muted flex items-center gap-1.5">
                <Globe size={12} className="text-premium-gold shrink-0" />
                <span>{address.country || "India"}</span>
              </p>
            </div>

            {/* Card Actions Bar */}
            <div className="mt-4 pt-3 border-t border-premium-border/60 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-premium-muted">
                {isSelected ? "Delivery Location" : "Click to select"}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => onEditButtonHandler(e, address)}
                  title="Edit Address"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-premium-border/60 text-premium-muted hover:border-premium-charcoal hover:bg-premium-charcoal hover:text-white transition-all cursor-pointer"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  type="button"
                  onClick={(e) => onDeleteButtonHandler(e, address)}
                  title="Delete Address"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-premium-border/60 text-premium-muted hover:border-rose-600 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
