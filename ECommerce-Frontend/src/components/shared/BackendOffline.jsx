import React, { useState } from "react";
import { ServerOff, RefreshCw, Database, CheckCircle2, ChevronDown, ChevronUp, Terminal, ShieldAlert, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const BackendOffline = ({
  errorMessage = "Unable to connect to the store backend.",
  onRetry,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [isDevView, setIsDevView] = useState(false);
  const isDevelopment = Boolean(import.meta.env.DEV);

  const handleRetry = () => {
    setIsRetrying(true);
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
    setTimeout(() => setIsRetrying(false), 1500);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-premium-border bg-premium-card p-8 sm:p-12 shadow-premium text-center transition-all duration-300">
        
        {/* ========================================================= */}
        {/* VIEW A: CUSTOMER-FACING OFFLINE STATE (DEFAULT / PROD)   */}
        {/* ========================================================= */}
        {!isDevView ? (
          <div>
            {/* Status Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-premium-border bg-premium-bg text-premium-gold shadow-sm mb-6">
              <ServerOff size={34} strokeWidth={1.5} />
            </div>

            {/* Reassuring Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-premium-border bg-premium-bg px-4 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-premium-gold mb-4 font-sans">
              <span className="h-1.5 w-1.5 rounded-full bg-premium-gold animate-pulse" />
              Service Notice
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-premium-text leading-tight">
              We'll Be Right Back
            </h2>

            {/* Divider */}
            <div className="mx-auto mt-3 h-0.5 w-10 bg-premium-gold/60" />

            {/* Reassuring Body Copy (Zero Technical Jargon) */}
            <p className="mx-auto mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-premium-muted font-sans">
              We are currently having trouble loading the catalog. Please try again in a few moments while we restore connection.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] px-7 py-3.5 text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-200 hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light active:scale-98 cursor-pointer disabled:opacity-50 font-sans"
              >
                <RefreshCw
                  size={14}
                  className={isRetrying ? "animate-spin" : ""}
                />
                <span>{isRetrying ? "Refreshing..." : "Retry"}</span>
              </button>

              <Link
                to="/contact"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-premium-border bg-premium-card px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-premium-text transition-all duration-200 hover:border-premium-gold hover:text-premium-gold font-sans"
              >
                <Headphones size={14} />
                <span>Contact Concierge</span>
              </Link>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW B: DEVELOPER / DIAGNOSTIC TELEMETRY VIEW             */
          /* ========================================================= */
          <div>
            {/* Dev Mode Badge */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-500 shadow-sm mb-4">
              <Terminal size={30} strokeWidth={1.75} />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 mb-3">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              DEV DIAGNOSTIC MODE
            </div>

            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-premium-text">
              Backend Unreachable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-premium-muted font-mono">
              Target API:{" "}
              <span className="font-bold text-premium-text bg-premium-bg px-1.5 py-0.5 rounded border border-premium-border">
                {import.meta.env.VITE_BACK_END_URL || "http://localhost:5000"}/api
              </span>
            </p>

            {/* Raw Error String */}
            {errorMessage && (
              <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-mono text-red-500">
                <ShieldAlert size={14} className="shrink-0 text-red-500" />
                <span className="truncate max-w-sm">{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons in Dev Mode */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-sans">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-premium-gold disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw size={13} className={isRetrying ? "animate-spin" : ""} />
                <span>{isRetrying ? "Retrying..." : "Retry API Call"}</span>
              </button>

              <button
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-premium-border bg-premium-card px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-premium-text hover:border-premium-gold cursor-pointer"
              >
                <span>Setup Checklist</span>
                {showTroubleshooting ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            </div>

            {/* Troubleshooting Checklist */}
            {showTroubleshooting && (
              <div className="mt-6 rounded-xl border border-premium-border bg-premium-bg p-5 text-left text-xs text-premium-text">
                <p className="font-bold uppercase tracking-wider text-premium-gold mb-3 text-[10px] font-sans">
                  Local Environment Checklist:
                </p>
                <ul className="space-y-2 font-mono text-[11px]">
                  <li className="flex items-start gap-2">
                    <Database size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <span>PostgreSQL: active on port <strong>5432</strong> (db: <code>ecommerce</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>Spring Boot: run <code>mvn spring-boot:run</code> in <code>sb-ecom</code> (port <strong>5000</strong>)</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Discreet Environment Switcher */}
        {isDevelopment && (
          <div className="mt-10 pt-4 border-t border-premium-border/40 flex items-center justify-center font-mono">
            <button
              onClick={() => setIsDevView(!isDevView)}
              className="text-[10px] uppercase tracking-widest text-premium-muted hover:text-premium-text transition-colors underline cursor-pointer"
            >
              {isDevView ? "← Switch to Customer View" : "🛠 Switch to Dev Diagnostics"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BackendOffline;
