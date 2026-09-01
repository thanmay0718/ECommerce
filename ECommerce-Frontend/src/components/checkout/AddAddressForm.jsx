import React, { useEffect } from "react";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../shared/Spinners";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/actions";
import {
  Building2,
  MapPin,
  Navigation,
  Globe,
  Hash,
  Sparkles,
} from "lucide-react";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const isEditing = Boolean(address?.addressId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdateUserAddress(
        data,
        toast,
        address?.addressId,
        setOpenAddressModal,
      ),
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName || "");
      setValue("street", address?.street || "");
      setValue("city", address?.city || "");
      setValue("state", address?.state || "");
      setValue("pincode", address?.pincode || "");
      setValue("country", address?.country || "India");
    } else {
      setValue("country", "India");
    }
  }, [address, setValue]);

  return (
    <div className="w-full">
      {/* Modal Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-premium-charcoal text-premium-gold shadow-sm mb-3">
          <Sparkles size={18} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-gold">
          Shipping Details
        </span>
        <h3 className="mt-1 text-xl font-bold uppercase tracking-tight text-premium-charcoal">
          {isEditing ? "Update Delivery Address" : "Add New Delivery Address"}
        </h3>
        <div className="mt-2 h-0.5 w-8 bg-premium-gold/60" />
      </div>

      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="space-y-4">
        <InputField
          label="Apartment / Building / Villa Name"
          required
          id="buildingName"
          type="text"
          message="*Building Name is required"
          placeholder="e.g. Skyline Towers, Apt 4B"
          register={register}
          errors={errors}
          icon={Building2}
        />

        <InputField
          label="Street Address / Landmark"
          required
          id="street"
          type="text"
          message="*Street Address is required"
          placeholder="e.g. 12th Avenue, Beverly Hills"
          register={register}
          errors={errors}
          icon={Navigation}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="e.g. Mumbai"
            register={register}
            errors={errors}
            icon={MapPin}
          />

          <InputField
            label="State / Province"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="e.g. Maharashtra"
            register={register}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Postal / Zip Code"
            required
            id="pincode"
            type="text"
            message="*Postal Code is required"
            placeholder="e.g. 400001"
            register={register}
            errors={errors}
            icon={Hash}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="e.g. India"
            register={register}
            errors={errors}
            icon={Globe}
          />
        </div>

        {/* Form Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-premium-border/60">
          <button
            type="button"
            onClick={() => setOpenAddressModal(false)}
            className="h-11 px-5 rounded-lg border border-premium-border bg-white text-xs font-bold uppercase tracking-wider text-premium-charcoal hover:bg-[#FAFAF9] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={btnLoader}
            className="h-11 px-7 rounded-lg bg-premium-charcoal text-xs font-bold uppercase tracking-wider text-white hover:bg-premium-gold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {btnLoader ? (
              <>
                <Spinners />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEditing ? "Save Changes" : "Save Address"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
