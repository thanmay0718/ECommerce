import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';

const AddressInfoModal = ({ open, setOpen, children }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      {/* Frosted Glass Backdrop */}
      <DialogBackdrop 
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200" 
      />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-y-auto">
        <DialogPanel 
          transition
          className="relative w-full max-w-lg mx-auto transform overflow-hidden bg-premium-card rounded-2xl shadow-2xl border border-premium-border transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 my-8"
        >
          {/* Close button */}
          <div className="absolute right-4 top-4 z-10">
            <button 
              onClick={() => setOpen(false)} 
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-bg text-premium-muted hover:bg-premium-charcoal hover:text-white transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-6 py-8 sm:px-8">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddressInfoModal;