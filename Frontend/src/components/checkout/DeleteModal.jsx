import React from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Spinners from "../shared/Spinners";

export const DeleteModal = ({
  open,
  setOpen,
  title,
  onDeleteHandler,
  loader,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-2xl bg-premium-card p-6 sm:p-8 text-left shadow-2xl border border-premium-border transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 sm:my-8 sm:w-full sm:max-w-md"
          >
            <div className="absolute right-4 top-4">
              <button
                disabled={loader}
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-bg text-premium-muted hover:bg-premium-charcoal hover:text-white transition-all cursor-pointer disabled:opacity-50"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 mb-4 ring-8 ring-rose-50/50">
                <AlertTriangle size={22} />
              </div>

              <DialogTitle
                as="h3"
                className="text-base font-bold uppercase tracking-wide text-premium-charcoal"
              >
                {title || "Confirm Removal"}
              </DialogTitle>

              <p className="mt-2 text-xs text-premium-muted leading-relaxed max-w-xs">
                Are you sure you want to delete this address? This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-4 border-t border-premium-border/60">
              <button
                disabled={loader}
                type="button"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto h-10.5 px-5 rounded-lg border border-premium-border bg-premium-card text-xs font-bold uppercase tracking-wider text-premium-charcoal hover:bg-premium-bg transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={loader}
                type="button"
                onClick={onDeleteHandler}
                className="w-full sm:w-auto h-10.5 px-6 rounded-lg bg-rose-600 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-700 shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loader ? (
                  <>
                    <Spinners />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Address</span>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;