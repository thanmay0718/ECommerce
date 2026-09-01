package com.ecommerce.sb_ecom.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecommerce.sb_ecom.security.services.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        logger.debug("AuthTokenFilter called for URL: {}", request.getRequestURL());

        try {
            String jwt = parseJwt(request);

            if (jwt != null) {
                logger.info("JWT Token extracted: {}", jwt.substring(0, Math.min(20, jwt.length())) + "...");
                
                if (jwtUtils.validateJwtToken(jwt)) {
                    String username = jwtUtils.getUserNameFromJWTToken(jwt);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    logger.info("✅ User '{}' authenticated successfully", username);
                } else {
                    logger.warn("❌ JWT Token validation failed");
                }
            } else {
                logger.warn("❌ No JWT Token found in request for URL: {}", request.getRequestURL());
            }

        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        // First try Authorization header (for SPA/Mobile apps)
        String jwt = jwtUtils.getJwtFromHeader(request);
        if (jwt != null) {
            logger.info("✅ JWT Token found in Authorization Header");
            return jwt;
        }
        
        // Fallback to cookies (for traditional web apps)
        jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt != null) {
            logger.info("✅ JWT Token found in Cookies");
            return jwt;
        }
        
        logger.warn("❌ No JWT Token found in Authorization Header or Cookies");
        return null;
    }

    /**
     * ============================================================
     * shouldNotFilter() — GOLDEN RULE
     * ============================================================
     *
     * ONLY skip the JWT filter for routes that are 100% public
     * and require NO authentication whatsoever.
     *
     * ❌ NEVER add protected routes here (admin, seller, user-specific).
     *    Doing so bypasses JWT parsing entirely → SecurityContext is
     *    never populated → Spring Security sees an anonymous user → 401.
     *
     * ✅ The JWT filter is safe to run on ALL requests — if no token
     *    is present or the token is invalid, the filter simply does
     *    nothing and moves on. Spring Security's authorizeHttpRequests
     *    rules in WebSecurityConfig then handle the 401/403 response.
     *
     * HOW TO ADD A NEW PROTECTED ENDPOINT IN FUTURE:
     *   1. Add .requestMatchers("/api/your-new-route/**").hasRole("ROLE")
     *      in WebSecurityConfig.filterChain()
     *   2. Do NOT add it here — that's the only step needed.
     *
     * HOW TO ADD A NEW PUBLIC ENDPOINT IN FUTURE:
     *   1. Add .requestMatchers("/api/your-public-route/**").permitAll()
     *      in WebSecurityConfig.filterChain()
     *   2. Optionally add it here too (minor performance gain — skips
     *      cookie parsing on public routes, but not required for correctness).
     * ============================================================
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return path.startsWith("/h2-console")       // [H2] Dev console — no auth needed
                || path.equals("/api/auth/signin")  // Login — no token yet
                || path.equals("/api/auth/signup")  // Register — no token yet
                || path.startsWith("/api/public/")  // Public product/category browsing
                || path.startsWith("/v3/api-docs")  // Swagger
                || path.startsWith("/v2/api-docs")  // Swagger legacy
                || path.startsWith("/swagger-ui")   // Swagger UI
                || path.startsWith("/swagger-resources") // Swagger resources
                || path.startsWith("/webjars")       // Swagger static assets
                || path.startsWith("/images")        // Public image assets
                || path.equals("/favicon.ico")
                || path.equals("/error");

        // -------------------------------------------------------
        // ❌ REMOVED — these were the bugs causing 401:
        //   || path.startsWith("/api/admin/")   → needs ADMIN JWT
        //   || path.startsWith("/api/test/")    → needs valid JWT
        // -------------------------------------------------------
    }
}