import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Link as LinkIcon } from "lucide-react";

const InputField = ({
    label,
    id,
    type = "text",
    errors = {},
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
    icon: CustomIcon,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

    // Determine default icon based on id or type
    const getFieldIcon = () => {
        if (CustomIcon) return CustomIcon;
        if (id === "username" || id === "name" || id === "fullName") return User;
        if (type === "email" || id === "email") return Mail;
        if (isPasswordField || id === "password" || id === "confirmPassword") return Lock;
        if (type === "url") return LinkIcon;
        return null;
    };

    const IconComponent = getFieldIcon();
    const hasError = Boolean(errors?.[id]?.message);

    return (
        <div className="flex flex-col gap-1.5 w-full text-left">
            {label && (
                <label
                    htmlFor={id}
                    className="text-[10px] font-bold uppercase tracking-[0.18em] text-premium-charcoal/80"
                >
                    {label}
                    {required && <span className="text-premium-gold ml-1">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {IconComponent && (
                    <div className="pointer-events-none absolute left-3.5 flex items-center text-premium-muted">
                        <IconComponent size={16} strokeWidth={1.75} />
                    </div>
                )}

                <input
                    type={inputType}
                    id={id}
                    placeholder={placeholder}
                    className={`
                        w-full h-12 rounded-lg border bg-premium-card text-xs font-medium tracking-wide text-premium-charcoal placeholder:text-premium-muted/50
                        transition-all duration-200 outline-none
                        ${IconComponent ? "pl-10" : "px-4"}
                        ${isPasswordField ? "pr-11" : "pr-4"}
                        ${
                            hasError
                                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                                : "border-premium-border focus:border-premium-charcoal focus:ring-2 focus:ring-premium-charcoal/10"
                        }
                        ${className || ""}
                    `}
                    {...register(id, {
                        required: { value: required, message },
                        minLength: min
                            ? { value: min, message: `Minimum ${min} characters required` }
                            : null,
                        pattern:
                            type === "email"
                                ? {
                                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                      message: "Please enter a valid email address",
                                  }
                                : type === "url"
                                ? {
                                      value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                      message: "Please enter a valid URL",
                                  }
                                : null,
                    })}
                />

                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3.5 flex h-7 w-7 items-center justify-center rounded-md text-premium-muted transition-colors hover:text-premium-charcoal focus:outline-none cursor-pointer"
                    >
                        {showPassword ? (
                            <EyeOff size={16} strokeWidth={1.75} />
                        ) : (
                            <Eye size={16} strokeWidth={1.75} />
                        )}
                    </button>
                )}
            </div>

            {hasError && (
                <p className="text-[11px] font-medium text-rose-600 mt-0.5 animate-fadeIn">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;