import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Info,
  LogIn,
  UserPlus,
  User,
  Package,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../store/actions";
import toast from "react-hot-toast";
import BackDrop from "./BackDrop";
import { useTheme } from "../../context/ThemeContext";

// Base nav items (always shown, auth-independent)
const navItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: Mail,
  },
  {
    title: "About",
    path: "/about",
    icon: Info,
  },
];

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: "0.65rem",
    paddingRight: "0.65rem",
  },

  animate: (isSelected) => ({
    gap: isSelected ? "0.5rem" : 0,
    paddingLeft: isSelected ? "1rem" : "0.65rem",
    paddingRight: isSelected ? "1rem" : "0.65rem",
  }),
};

const spanVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },

  animate: {
    width: "auto",
    opacity: 1,
  },

  exit: {
    width: 0,
    opacity: 0,
  },
};

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.45,
};

/* ============================================================
   PREMIUM DARK/LIGHT PILL TOGGLE
   A 52×28px pill with sliding circular thumb.
   Sun icon = light mode, Moon = dark mode.
   Uses framer-motion spring for tactile thumb slide.
   ============================================================ */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-premium-border bg-premium-card px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-premium-charcoal shadow-premium z-50 pointer-events-none"
          >
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Track */}
      <motion.button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative flex h-7 w-[52px] cursor-pointer items-center rounded-full border p-0.5 focus:outline-none"
        style={{
          backgroundColor: isDark ? "#1C1C1C" : "#F0EDE8",
          borderColor: isDark ? "#C9A961" : "#D5D3CF",
          boxShadow: isDark
            ? "0 0 0 1px rgba(201,169,97,0.25), inset 0 1px 3px rgba(0,0,0,0.4)"
            : "inset 0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        {/* Thumb */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="flex h-5 w-5 items-center justify-center rounded-full shadow-md"
          style={{
            marginLeft: isDark ? "auto" : "0",
            marginRight: isDark ? "0" : "auto",
            backgroundColor: isDark ? "#C9A961" : "#1A1A1A",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ rotate: -60, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 60, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <Moon
                  size={11}
                  strokeWidth={2.2}
                  className="text-premium-charcoal"
                  style={{ color: "#1A1A1A" }}
                />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: 60, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -60, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                <Sun
                  size={11}
                  strokeWidth={2.2}
                  style={{ color: "#F2F1EE" }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cart } = useSelector((state) => state.carts || { cart: [] });
  const { user } = useSelector((state) => state.auth);

  // ===== AUTH CHECK (same instruction as the other NavBar) =====
  // If Redux has user info, treat as logged in and show Welcome/menu
  // instead of Login.
  const isAuthenticated = Boolean(user && user.id);

  const displayName =
    user?.username ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : "User");

  const cartCount = (cart || []).reduce(
    (acc, item) => acc + (Number(item.quantity) || 1),
    0,
  );

  const outsideClickRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
  });

  useOnClickOutside(dropdownRef, () => {
    setDropdownOpen(false);
  });

  const handleNavigation = (index, path) => {
    setSelected(index);
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    dispatch(logOutUser(navigate, toast));
  };

  return (
    <>
      {dropdownOpen && <BackDrop onClick={() => setDropdownOpen(false)} />}
      <header className="sticky top-0 z-50 w-full border-b border-premium-border bg-premium-bg/90 backdrop-blur-md transition-all duration-300">
        {/* ================= TOP ANNOUNCEMENT BAR ================= */}
        <div className="w-full bg-premium-charcoal py-2 px-4 text-center border-b border-white/5">
          <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/90">
            <span className="h-1 w-1 rounded-full bg-premium-gold" />
            <span>Complimentary Express Shipping on Orders Over ₹999</span>
            <span className="h-1 w-1 rounded-full bg-premium-gold" />
          </div>
        </div>

        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* ================= LOGO ================= */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-premium-charcoal text-white shadow-sm transition-all duration-300 group-hover:bg-premium-muted">
              <ShoppingBag size={18} strokeWidth={1.8} />
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-md font-bold tracking-wider uppercase text-premium-charcoal">
                E-Shop
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-premium-gold">
                Luxury
              </p>
            </div>
          </button>

          {/* ================= DESKTOP NAV ================= */}
          <div
            ref={outsideClickRef}
            className="hidden md:flex items-center gap-2 rounded-xl border border-premium-border bg-premium-card p-1 shadow-premium"
          >
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;

                const isActive = pathname === item.path;

                const isSelected = selected === index || isActive;

                return (
                  <motion.button
                    key={item.title}
                    variants={buttonVariants}
                    initial={false}
                    animate="animate"
                    custom={isSelected}
                    transition={transition}
                    onClick={() => handleNavigation(index, item.path)}
                    className={`
                    relative flex h-9 items-center rounded-lg
                    text-xs font-semibold uppercase tracking-wider
                    transition-colors duration-200 cursor-pointer
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-premium-border
                    ${
                      isSelected
                        ? "bg-premium-gold text-premium-charcoal shadow-sm font-bold"
                        : "text-premium-muted hover:bg-premium-bg hover:text-premium-text"
                    }
                  `}
                  >
                    <Icon size={15} strokeWidth={isSelected ? 2 : 1.6} />

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.span
                          variants={spanVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={transition}
                          className="overflow-hidden whitespace-nowrap pl-1"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* ===== AUTH SECTION (Desktop): Welcome/menu if logged in, else Login/Signup ===== */}
            <div>
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-label={`Open account menu for ${displayName}`}
                    title={displayName}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      dropdownOpen
                        ? "bg-premium-charcoal text-white"
                        : "bg-premium-bg text-premium-muted hover:bg-premium-charcoal hover:text-white"
                    }`}
                  >
                    <User size={15} strokeWidth={1.8} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 rounded-xl border border-premium-border bg-premium-card p-1.5 shadow-xl z-50"
                      >
                        <div className="border-b border-premium-border px-3 py-2 text-left">
                          <p className="text-[10px] uppercase tracking-wider text-premium-muted">
                            Signed in as
                          </p>
                          <p className="break-words text-xs font-bold text-premium-charcoal">
                            {displayName}
                          </p>
                        </div>

                        <div className="py-1">
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              navigate("/profile");
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-premium-charcoal hover:bg-premium-bg transition-colors cursor-pointer"
                          >
                            <User size={14} />
                            Profile
                          </button>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              navigate("/orders");
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-premium-charcoal hover:bg-premium-bg transition-colors cursor-pointer"
                          >
                            <Package size={14} />
                            Orders
                          </button>
                        </div>

                        <div className="border-t border-premium-border pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <LogOut size={14} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <motion.button
                    variants={buttonVariants}
                    initial={false}
                    animate="animate"
                    custom={pathname === "/login" || selected === "/login"}
                    transition={transition}
                    onClick={() => {
                      setSelected("/login");
                      navigate("/login");
                    }}
                    className={`relative flex h-9 items-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-premium-border ${
                      pathname === "/login" || selected === "/login"
                        ? "bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] shadow-sm font-bold"
                        : "text-premium-muted hover:bg-premium-bg hover:text-premium-text"
                    }`}
                  >
                    <LogIn size={15} strokeWidth={1.8} />
                    <AnimatePresence initial={false}>
                      {(pathname === "/login" || selected === "/login") && (
                        <motion.span
                          variants={spanVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={transition}
                          className="overflow-hidden whitespace-nowrap pl-1"
                        >
                          Login
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    initial={false}
                    animate="animate"
                    custom={
                      pathname === "/register" || selected === "/register"
                    }
                    transition={transition}
                    onClick={() => {
                      setSelected("/register");
                      navigate("/register");
                    }}
                    className={`relative flex h-9 items-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-premium-border ${
                      pathname === "/register" || selected === "/register"
                        ? "bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] shadow-sm font-bold"
                        : "text-premium-muted hover:bg-premium-bg hover:text-premium-text"
                    }`}
                  >
                    <UserPlus size={15} strokeWidth={1.8} />
                    <AnimatePresence initial={false}>
                      {(pathname === "/register" ||
                        selected === "/register") && (
                        <motion.span
                          variants={spanVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={transition}
                          className="overflow-hidden whitespace-nowrap pl-1"
                        >
                          Signup
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT ACTIONS (THEME TOGGLE + CART + MOBILE) ================= */}
          <div className="flex items-center gap-3">
            {/* ===== PREMIUM DARK/LIGHT THEME TOGGLE ===== */}
            <div className="hidden sm:flex items-center">
              <ThemeToggle />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => {
                navigate("/cart");
                setMobileOpen(false);
              }}
              className={`
              relative flex h-10 items-center gap-2 rounded-xl border px-3.5
              transition-all duration-200 cursor-pointer
              focus:outline-none
              ${
                pathname === "/cart"
                  ? "border-premium-gold bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] shadow-sm font-bold"
                  : "border-premium-border bg-premium-card text-premium-text shadow-premium hover:border-premium-gold hover:bg-premium-bg"
              }
            `}
              title="View Shopping Cart"
            >
              <ShoppingCart size={17} strokeWidth={1.8} />
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                Cart
              </span>
              <span
                className={`
                flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold
                transition-all duration-200
                ${
                  pathname === "/cart"
                    ? "bg-premium-gold text-premium-charcoal"
                    : "bg-premium-charcoal text-white"
                }
              `}
              >
                {cartCount}
              </span>
            </button>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-premium-charcoal transition-colors hover:bg-premium-bg md:hidden cursor-pointer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="overflow-hidden border-t border-premium-border bg-premium-card md:hidden"
            >
              <nav className="px-4 py-4 sm:px-8">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;

                    const isActive = pathname === item.path;

                    return (
                      <button
                        key={item.title}
                        onClick={() => handleNavigation(index, item.path)}
                        className={`
                        flex items-center gap-3 rounded-lg
                        border px-4 py-3 text-left
                        text-xs font-semibold uppercase tracking-wider
                        transition-all duration-200 cursor-pointer
                        ${
                          isActive
                            ? "border-premium-charcoal bg-premium-charcoal text-white"
                            : "border-premium-border bg-premium-card text-premium-muted hover:bg-premium-bg hover:text-premium-charcoal"
                        }
                      `}
                      >
                        <Icon size={16} />
                        {item.title}
                      </button>
                    );
                  })}

                  {/* ===== AUTH SECTION (Mobile): Welcome block if logged in, else Login/Signup ===== */}
                  {isAuthenticated ? (
                    <div className="col-span-2 mt-2 space-y-2 border-t border-premium-border pt-3">
                      <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-premium-gold">
                        <User size={14} />
                        <span>Welcome, {displayName}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setMobileOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-lg border border-premium-border bg-premium-card px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-premium-charcoal hover:bg-premium-bg"
                        >
                          <User size={15} />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            navigate("/orders");
                            setMobileOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-lg border border-premium-border bg-premium-card px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-premium-charcoal hover:bg-premium-bg"
                        >
                          <Package size={15} />
                          Orders
                        </button>
                        <button
                          onClick={handleLogout}
                          className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/login");
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg border border-premium-border bg-premium-card px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-premium-muted hover:bg-premium-bg hover:text-premium-charcoal"
                      >
                        <LogIn size={16} />
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/register");
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg border border-premium-border bg-premium-card px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-premium-muted hover:bg-premium-bg hover:text-premium-charcoal"
                      >
                        <UserPlus size={16} />
                        Signup
                      </button>
                    </>
                  )}

                  {/* Mobile Theme Toggle */}
                  <div className="col-span-2 mt-2 flex items-center justify-between rounded-lg border border-premium-border bg-premium-card px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-premium-muted">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>

                  {/* Mobile Cart Link */}
                  <button
                    onClick={() => {
                      navigate("/cart");
                      setMobileOpen(false);
                    }}
                    className={`
                    flex items-center justify-between rounded-lg
                    border px-4 py-3 text-left
                    text-xs font-semibold uppercase tracking-wider
                    transition-all duration-200 cursor-pointer col-span-2
                    ${
                      pathname === "/cart"
                        ? "border-premium-charcoal bg-premium-charcoal text-white"
                        : "border-premium-border bg-premium-card text-premium-charcoal hover:bg-premium-bg"
                    }
                  `}
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart size={16} />
                      <span>Shopping Cart</span>
                    </div>
                    <span
                      className={`
                      flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold
                      ${
                        pathname === "/cart"
                          ? "bg-premium-gold text-premium-charcoal"
                          : "bg-premium-charcoal text-white"
                      }
                    `}
                    >
                      {cartCount}
                    </span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default NavBar;
