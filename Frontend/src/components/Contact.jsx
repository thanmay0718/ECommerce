import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="min-h-screen bg-premium-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold font-sans">
            Get in touch
          </p>

          <h1 className="text-3xl font-bold uppercase tracking-tight text-premium-text sm:text-4xl">
            Contact Us
          </h1>
          <div className="mt-4 h-0.5 w-12 bg-premium-gold/60 mx-auto" />

          <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-premium-muted uppercase tracking-wider">
            Have a question, need support, or simply want to talk?
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-premium-border bg-premium-card shadow-sm">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

            {/* Left Section — Rich dark panel in both light & dark mode */}
            <div className="bg-[#1A1A1A] dark:bg-[#141416] p-8 text-white sm:p-10 lg:p-12 border-r border-premium-border/10">

              <div className="flex h-full flex-col">

                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-premium-gold font-sans">
                    Contact Information
                  </span>

                  <h2 className="mt-8 text-2xl font-bold uppercase leading-tight tracking-wide text-white">
                    Let's start a
                    <span className="block text-premium-gold mt-1">
                      conversation.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-xs text-xs leading-relaxed text-stone-300 font-sans">
                    Whether you have a question about our products,
                    orders, or anything else, our team is ready to help.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="mt-12 space-y-7">

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-premium-gold">
                      <FaPhone size={13} />
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400 font-sans">
                        Phone
                      </p>

                      <p className="mt-1 text-xs font-semibold text-white">
                        +91 73967 67655
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-premium-gold">
                      <FaEnvelope size={13} />
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400 font-sans">
                        Email
                      </p>

                      <p className="mt-1 break-all text-xs font-semibold text-white">
                        rachatanmay0718@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-premium-gold">
                      <FaMapMarkerAlt size={13} />
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400 font-sans">
                        Location
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-white">
                        123 Main Street,
                        <br />
                        City, Country
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom Text */}
                <div className="mt-auto hidden pt-12 lg:block">
                  <div className="h-px w-full bg-white/10" />

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-sans">
                    We usually respond within 24 hours.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Section */}
            <div className="p-8 sm:p-10 lg:p-12 bg-premium-card">

              <div className="mb-8">
                <h2 className="text-lg font-bold uppercase tracking-wider text-premium-text">
                  Send us a message
                </h2>

                <p className="mt-2 text-xs text-premium-muted uppercase tracking-wider font-sans">
                  Fill out the form below and we'll be in touch.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-[10px] font-bold uppercase tracking-widest text-premium-muted font-sans"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-premium-border bg-premium-bg px-4 py-3 text-xs uppercase tracking-wider text-premium-text placeholder:text-premium-muted/60 outline-none transition focus:border-premium-gold"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-[10px] font-bold uppercase tracking-widest text-premium-muted font-sans"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-premium-border bg-premium-bg px-4 py-3 text-xs uppercase tracking-wider text-premium-text placeholder:text-premium-muted/60 outline-none transition focus:border-premium-gold"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-[10px] font-bold uppercase tracking-widest text-premium-muted font-sans"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full resize-none rounded-xl border border-premium-border bg-premium-bg px-4 py-3 text-xs uppercase tracking-wider text-premium-text placeholder:text-premium-muted/60 outline-none transition focus:border-premium-gold"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] px-5 py-3.5 text-xs font-bold uppercase tracking-widest shadow-md hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light transition duration-200 cursor-pointer font-sans"
                >
                  Send Message

                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>

              </form>

            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-[9px] font-semibold uppercase tracking-wider text-premium-muted font-sans">
          Your information is safe with us and will never be shared.
        </p>

      </div>
    </section>
  );
};

export default Contact;