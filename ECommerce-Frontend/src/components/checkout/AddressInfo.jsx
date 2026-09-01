import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import AddressList from './AddressList';
import DeleteModal from './DeleteModal';
import Skeleton from '../shared/Skeleton';
import { deleteUserAddress, getUserAddresses, selectUserCheckoutAddress } from '../../store/actions';

const AddressInfo = ({ onNext }) => {
    const dispatch = useDispatch();
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const { address, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    // Auto-select first address if none is selected and addresses exist
    useEffect(() => {
        if (address && address.length > 0 && !selectedUserCheckoutAddress) {
            dispatch(selectUserCheckoutAddress(address[0]));
        }
    }, [address, selectedUserCheckoutAddress, dispatch]);

    const addNewAddressHandler = () => {
        setSelectedAddress(null);
        setOpenAddressModal(true);
    };

    const deleteAddressHandler = () => {
        if (selectedAddress?.addressId) {
            dispatch(deleteUserAddress(
                toast,
                selectedAddress.addressId,
                setOpenDeleteModal
            ));
        }
    };

    const handleContinue = () => {
        if (!selectedUserCheckoutAddress) {
            toast.error("Please select or add a delivery address to proceed");
            return;
        }
        onNext?.();
    };

    const noAddressExist = !address || address.length === 0;

    return (
        <div className="space-y-6">
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-premium-border/70 pb-5">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-gold font-sans">
                        Step 1 of 4
                    </span>
                    <h2 className="mt-1 text-2xl font-bold uppercase tracking-tight text-premium-text">
                        Shipping Destination
                    </h2>
                    <p className="mt-1 text-xs text-premium-muted">
                        Select an existing delivery address or register a new location
                    </p>
                </div>

                {!noAddressExist && (
                    <button
                        type="button"
                        onClick={addNewAddressHandler}
                        className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-premium-border bg-premium-card text-xs font-bold uppercase tracking-wider text-premium-text hover:border-premium-gold hover:text-premium-gold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                        <Plus size={14} />
                        <span>Add New Address</span>
                    </button>
                )}
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className="p-8 rounded-2xl border border-premium-border bg-premium-card shadow-xs">
                    <Skeleton />
                </div>
            ) : noAddressExist ? (
                /* Luxury Empty State */
                <div className="flex flex-col items-center justify-center p-10 sm:p-14 rounded-2xl border border-dashed border-premium-border bg-premium-card text-center shadow-xs">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-premium-bg text-premium-gold shadow-inner mb-4 ring-8 ring-premium-bg/60">
                        <MapPin size={28} />
                    </div>

                    <h3 className="text-lg font-bold uppercase tracking-tight text-premium-text">
                        No Saved Addresses Found
                    </h3>

                    <p className="mt-2 max-w-sm text-xs text-premium-muted leading-relaxed">
                        Add your primary delivery destination to receive complimentary express insured shipping.
                    </p>

                    <button
                        type="button"
                        onClick={addNewAddressHandler}
                        className="mt-6 inline-flex items-center gap-2 h-11 px-7 rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] text-xs font-bold uppercase tracking-wider hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <Plus size={15} />
                        <span>Add First Address</span>
                    </button>
                </div>
            ) : (
                /* Address Grid */
                <div className="space-y-6">
                    <AddressList
                        addresses={address}
                        setSelectedAddress={setSelectedAddress}
                        setOpenAddressModal={setOpenAddressModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                    />

                    {/* Add Address Card Button */}
                    <div
                        onClick={addNewAddressHandler}
                        className="group flex items-center justify-center gap-3 p-5 rounded-2xl border border-dashed border-premium-border hover:border-premium-gold bg-premium-bg hover:bg-premium-card text-premium-muted hover:text-premium-text transition-all duration-200 cursor-pointer shadow-2xs"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-card group-hover:bg-premium-gold group-hover:text-[#0E0E10] text-premium-text shadow-xs transition-colors border border-premium-border">
                            <Plus size={15} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider">
                            Add Another Delivery Address
                        </span>
                    </div>

                    {/* Action Navigation Footer */}
                    <div className="pt-6 border-t border-premium-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-premium-muted">
                            <ShieldCheck size={16} className="text-premium-gold" />
                            <span>Your delivery details are protected with private encryption</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleContinue}
                            disabled={!selectedUserCheckoutAddress}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] text-xs font-bold uppercase tracking-widest hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <span>Continue to Payment</span>
                            <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}
            >
                <AddAddressForm
                    address={selectedAddress}
                    setOpenAddressModal={setOpenAddressModal}
                />
            </AddressInfoModal>

            <DeleteModal
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    );
};

export default AddressInfo;