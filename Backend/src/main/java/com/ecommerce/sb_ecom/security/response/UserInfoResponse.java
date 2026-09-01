package com.ecommerce.sb_ecom.security.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "jwtToken", "username", "roles"})
public class UserInfoResponse {
    private Long id;
    private String jwtToken;   // ✅ Moved to 2nd position
    private String username;   // ✅ Moved to 3rd position
    private List<String> roles;

    public UserInfoResponse(Long id, String username, List<String> roles) {
        this(id, null, username, roles);
    }

    public UserInfoResponse(Long id, String jwtToken, String username, List<String> roles) {
        this.id = id;
        this.jwtToken = jwtToken;
        this.username = username;
        this.roles = roles;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getJwtToken() { return jwtToken; }
    public void setJwtToken(String jwtToken) { this.jwtToken = jwtToken; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
}