import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';
import { ShoppingBag, UserPlus, Sparkles, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        console.log("Register Click");
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-100px)] w-full bg-premium-bg flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-premium-border bg-premium-card shadow-premium grid lg:grid-cols-12 min-h-[680px] animate-fadeIn">
                
                {/* ================= LEFT EDITORIAL PANEL (60% Desktop) ================= */}
                <div className="relative hidden lg:flex lg:col-span-7 flex-col justify-between bg-gradient-to-br from-premium-charcoal via-[#222222] to-[#121212] p-12 text-white overflow-hidden">
                    {/* Ambient Glows */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-premium-gold/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-stone-700/20 blur-3xl" />

                    {/* Top Brand Tag */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 text-premium-gold backdrop-blur-md">
                            <ShoppingBag size={18} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p className="text-sm font-bold tracking-widest uppercase">E-Shop</p>
                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-premium-gold">Maison de Luxe</p>
                        </div>
                    </div>

                    {/* Center Brand Statement */}
                    <div className="relative z-10 my-auto py-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-premium-gold/30 bg-premium-gold/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-premium-gold mb-6">
                            <Crown size={12} />
                            <span>Exclusive Membership</span>
                        </div>
                        <h2 className="text-3xl xl:text-4xl font-bold uppercase tracking-tight leading-tight">
                            Elevate Your
                            <span className="block text-premium-gold mt-1">Shopping Journey.</span>
                        </h2>
                        <p className="mt-4 text-xs xl:text-sm text-stone-300 leading-relaxed max-w-md font-sans">
                            Create your account to unlock private sales, bespoke concierge recommendations, and seamless checkout across all devices.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs text-stone-400 font-sans">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-premium-gold shrink-0" />
                                <span>Complimentary Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-premium-gold shrink-0" />
                                <span>Priority Assistance</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Editorial Quote */}
                    <div className="relative z-10 text-[10px] uppercase tracking-widest text-stone-400 font-sans">
                        © E-Commerce Platform. All Rights Reserved.
                    </div>
                </div>

                {/* ================= RIGHT FORM PANEL (40% Desktop) ================= */}
                <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-premium-card">
                    
                    {/* Mobile Brand Badge */}
                    <div className="lg:hidden flex items-center gap-2.5 mb-6">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-premium-charcoal text-white">
                            <ShoppingBag size={15} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-premium-text font-sans">E-Shop Luxury</span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-premium-bg border border-premium-border text-premium-gold shadow-sm mb-4">
                            <UserPlus size={18} strokeWidth={1.8} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-premium-text uppercase leading-tight">
                            Create Account
                        </h1>
                        <p className="mt-2 text-xs text-premium-muted leading-relaxed font-sans">
                            Join our community to enjoy an elevated shopping experience.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
                        <InputField
                            label="Username"
                            required
                            id="username"
                            type="text"
                            message="*Username is required"
                            placeholder="Choose a username"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Email Address"
                            required
                            id="email"
                            type="email"
                            message="*Email is required"
                            placeholder="Enter your email"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Password"
                            required
                            id="password"
                            min={6}
                            type="password"
                            message="*Password is required"
                            placeholder="Create a strong password"
                            register={register}
                            errors={errors}
                        />

                        {/* Submit Button */}
                        <button
                            disabled={loader}
                            type="submit"
                            className="
                                group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl
                                bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] px-6 text-xs font-bold uppercase tracking-widest shadow-md
                                transition-all duration-300 hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light
                                active:scale-98 disabled:opacity-50 cursor-pointer font-sans
                            "
                        >
                            {loader ? (
                                <div className="flex items-center gap-2">
                                    <Spinners size="w-4 h-4" color="text-white fill-premium-gold" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Register Now</span>
                                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Logins Divider (Visual Only) */}
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-premium-border" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-premium-muted">OR</span>
                        <div className="h-px flex-1 bg-premium-border" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => toast("Social registration will be enabled soon", { icon: "✨" })}
                            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-premium-border bg-premium-bg/60 text-xs font-medium text-premium-charcoal transition-all duration-200 hover:border-premium-charcoal hover:bg-white cursor-pointer"
                        >
                            <FaGoogle size={13} className="text-red-500" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">Google</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => toast("Social registration will be enabled soon", { icon: "✨" })}
                            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-premium-border bg-premium-bg/60 text-xs font-medium text-premium-charcoal transition-all duration-200 hover:border-premium-charcoal hover:bg-white cursor-pointer"
                        >
                            <FaApple size={14} />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">Apple</span>
                        </button>
                    </div>

                    {/* Switch to Login */}
                    <p className="mt-7 text-center text-xs text-premium-muted">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold uppercase tracking-wider text-premium-charcoal transition-colors hover:text-premium-gold hover:underline ml-1"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;