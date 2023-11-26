package com.github.pablwoaraujo.imageliteapi.domain.service;

import com.github.pablwoaraujo.imageliteapi.domain.AccessToken;
import com.github.pablwoaraujo.imageliteapi.domain.entity.User;

public interface UserService {

    User getByEmail(String email);

    User save(User user);

    AccessToken authenticate(String email, String password);
}
