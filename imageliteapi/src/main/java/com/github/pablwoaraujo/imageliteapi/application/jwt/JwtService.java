package com.github.pablwoaraujo.imageliteapi.application.jwt;

import org.springframework.stereotype.Service;

import com.github.pablwoaraujo.imageliteapi.domain.AccessToken;
import com.github.pablwoaraujo.imageliteapi.domain.entity.User;

@Service
public class JwtService {

    public AccessToken generateToken(User user) {
        return new AccessToken(""); // TODO
    }

}
