import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { bannerList } from "../../utils";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="py-1 rounded-2xl overflow-hidden shadow-premium border border-premium-border/50 bg-[#F5F4F0] dark:bg-[#16161A]">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={false}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet bg-premium-gold",
        }}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
      >
        {bannerList.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="h-[480px] w-full rounded-2xl p-8 lg:p-14 flex items-center justify-between bg-[#F5F4F0] dark:bg-[#16161A] transition-colors duration-300">
              <div className="flex w-full items-center justify-center lg:justify-between max-w-[1280px] mx-auto">
                {/* Text Content */}
                <div className="hidden lg:flex flex-col justify-center items-start w-[48%] text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A961] mb-3 font-sans">
                    {item.subtitle}
                  </span>

                  <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#F5F4F0] leading-tight mb-4 font-sans">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-[#6B6B6B] dark:text-[#9E9D97] mb-8 max-w-md font-sans">
                    {item.description}
                  </p>
                  
                  <Link
                    className="inline-block bg-[#C9A961] text-[#1A1A1A] dark:bg-[#C9A961] dark:text-[#0E0E10] text-[11px] font-bold uppercase tracking-widest py-3.5 px-8 rounded-xl hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-[#0E0E10] transition-all duration-300 shadow-md font-sans"
                    to="/products"
                  >
                    Shop Collection
                  </Link>
                </div>
                
                {/* Image Showcase */}
                <div className="h-[360px] w-full lg:w-[48%] flex items-center justify-center overflow-hidden">
                  <img 
                    src={item?.image} 
                    alt={item.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-[0_12px_28px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const isDark = document.documentElement.classList.contains("dark");
                      const bg = isDark ? "16161A" : "F5F4F0";
                      const color = isDark ? "D4B46A" : "6B6B6B";
                      e.target.src = `https://placehold.co/600x400/${bg}/${color}?text=Collection+Item`;
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
