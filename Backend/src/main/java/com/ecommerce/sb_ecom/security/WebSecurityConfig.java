package com.ecommerce.sb_ecom.security;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ecommerce.sb_ecom.Model.AppRole;
import com.ecommerce.sb_ecom.Model.Role;
import com.ecommerce.sb_ecom.Model.User;
import com.ecommerce.sb_ecom.repositories.RoleRepository;
import com.ecommerce.sb_ecom.repositories.UserRepository;
import com.ecommerce.sb_ecom.security.jwt.AuthEntryPointJwt;
import com.ecommerce.sb_ecom.security.jwt.AuthTokenFilter;
import com.ecommerce.sb_ecom.security.services.UserDetailsServiceImpl;

/**
 * ============================================================
 * WebSecurityConfig — Spring Security Configuration
 * ============================================================
 *
 * CURRENT MODE : MySQL (Production/Dev with real DB)
 *
 * -------------------------------------------------------
 * HOW TO SWITCH TO H2 (In-Memory) — 3 Steps:
 * -------------------------------------------------------
 *
 * STEP 1 — application.properties
 *   Comment out the MySQL datasource block:
 *     # spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
 *     # spring.datasource.username=root
 *     # spring.datasource.password=your_password
 *     # spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
 *
 *   Uncomment the H2 datasource block:
 *     spring.datasource.url=jdbc:h2:mem:testdb
 *     spring.datasource.driver-class-name=org.h2.Driver
 *     spring.datasource.username=sa
 *     spring.datasource.password=
 *     spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
 *     spring.h2.console.enabled=true
 *     spring.h2.console.path=/h2-console
 *
 * STEP 2 — This file (WebSecurityConfig.java)
 *   a) Uncomment the two H2 imports at the top of this file.
 *   b) Uncomment the h2ConsoleServlet() bean below.
 *
 * STEP 3 — Done!
 *   Access H2 Console at: http://localhost:8080/h2-console
 *   JDBC URL : jdbc:h2:mem:testdb
 *   Username : sa
 *   Password : (leave blank)
 * -------------------------------------------------------
 */

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Value("${frontend.url}")
    private String frontendUrl;

    // -------------------------------------------------------
    // [H2 ONLY] Uncomment this entire bean when switching to H2.
    // Registers H2's web console as a servlet so Spring Boot
    // serves it at /h2-console even under Spring Security.
    // -------------------------------------------------------
    //
    // @Bean
    // public ServletRegistrationBean<JakartaWebServlet> h2ConsoleServlet() {
    //     ServletRegistrationBean<JakartaWebServlet> bean =
    //             new ServletRegistrationBean<>(new JakartaWebServlet(), "/h2-console/*");
    //     bean.addInitParameter("webAllowOthers", "true");
    //     bean.setLoadOnStartup(1);
    //     return bean;
    // }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        String cleanedUrl = frontendUrl.replaceAll("/$", "");
        configuration.setAllowedOrigins(java.util.Arrays.asList(cleanedUrl, "http://localhost:3000"));
        configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(java.util.Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // Enable CORS with our custom configuration
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disabled — JWT stateless APIs do not use cookie-based sessions,
                // so CSRF protection is not applicable here.
                .csrf(csrf -> csrf.disable())

                // sameOrigin() — allows H2 console iframe to render inside the browser.
                // Safe to keep even on MySQL; has no effect when H2 is not in use.
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin())
                )

                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(unauthorizedHandler)
                )

                // Stateless — no HttpSession created or used (JWT handles auth state)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // [H2 ONLY] Route kept as-is — no effect when H2 is disabled.
                        // Automatically works when you switch back to H2 (see class Javadoc).
                        .requestMatchers("/h2-console/**").permitAll()

                        .requestMatchers("/error").permitAll()

                        // CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public auth endpoints (login, register)
                        .requestMatchers("/api/auth/**").permitAll()

                        // Swagger / OpenAPI docs
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/v2/api-docs",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/swagger-resources/**",
                                "/configuration/ui",
                                "/configuration/security",
                                "/webjars/**"
                        ).permitAll()

                        // Public browsing APIs (product listing, categories, etc.)
                        .requestMatchers("/api/public/**").permitAll()

                        // Static image assets
                        .requestMatchers("/images/**").permitAll()

                        // Admin APIs — ADMIN role required
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Test endpoints — valid JWT required
                        .requestMatchers("/api/test/**").authenticated()

                        // Everything else requires a valid JWT token
                        .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(
                authenticationJwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository,
                                      UserRepository userRepository) {
        return args -> {

            // Roles — idempotent: inserts only if not already present in DB.
            // Safe to run on every application restart.
            Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

            Role sellerRole = roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                    .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_SELLER)));

            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                    .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));

            Set<Role> userRoles   = Set.of(userRole);
            Set<Role> sellerRoles = Set.of(sellerRole);
            Set<Role> adminRoles  = Set.of(adminRole, userRole, sellerRole);

            // Seed users — roles assigned before save (single DB write per user).
            // Idempotent: skipped entirely if username already exists.
            if (!userRepository.existsByUserName("user1")) {
                User user = new User("user1", "user1@example.com",
                        passwordEncoder().encode("password1"));
                user.setRoles(userRoles);
                userRepository.save(user);
            }

            if (!userRepository.existsByUserName("seller1")) {
                User seller = new User("seller1", "seller1@example.com",
                        passwordEncoder().encode("password2"));
                seller.setRoles(sellerRoles);
                userRepository.save(seller);
            }

            if (!userRepository.existsByUserName("admin")) {
                User admin = new User("admin", "admin@example.com",
                        passwordEncoder().encode("adminPass"));
                admin.setRoles(adminRoles);
                userRepository.save(admin);
            }
        };
    }
}