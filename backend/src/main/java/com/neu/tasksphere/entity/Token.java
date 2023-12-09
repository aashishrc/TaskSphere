package com.neu.tasksphere.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "token_unique",
                        columnNames = "token"
                )
        })
public class Token {

    @Id
    @GeneratedValue
    public Integer id;

    @Column(unique = true)
    public String token;

    public String tokenType = "BEARER";

    public boolean revoked;

    public boolean expired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

    public Token() {
    }

    public Token(String token,
                 String tokenType,
                 boolean revoked,
                 boolean expired,
                 User user) {
        this.token = token;
        this.tokenType = tokenType;
        this.revoked = revoked;
        this.expired = expired;
        this.user = user;
    }

    public Integer getId() {
        return this.id;
    }

    public String getToken() {
        return this.token;
    }

    public String getTokenType() {
        return this.tokenType;
    }

    public boolean isRevoked() {
        return this.revoked;
    }

    public boolean isExpired() {
        return this.expired;
    }

    public User getUser() {
        return this.user;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setRevoked(boolean revoked) {
        this.revoked = revoked;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Token token = (Token) o;
        return Objects.equals(token, token.token) && Objects.equals(tokenType, token.tokenType);
    }
}