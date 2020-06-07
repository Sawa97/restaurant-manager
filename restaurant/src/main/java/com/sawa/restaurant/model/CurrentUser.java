package com.sawa.restaurant.model;

import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Data
public class CurrentUser implements UserDetails {

    private String email;
    private Long number;
    private String name;
    private String surname;
    private String password;
    private GrantedAuthority authority;

    public CurrentUser(Employee user) {
        this.email = user.getEmail();
        this.number = user.getNumber();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.password = user.getPassword();
        this.authority = new SimpleGrantedAuthority("ROLE_"+user.getRole().name());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
