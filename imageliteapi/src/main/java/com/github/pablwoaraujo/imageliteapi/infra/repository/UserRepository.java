package com.github.pablwoaraujo.imageliteapi.infra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.pablwoaraujo.imageliteapi.domain.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

    User findByEmail(String email);

}
