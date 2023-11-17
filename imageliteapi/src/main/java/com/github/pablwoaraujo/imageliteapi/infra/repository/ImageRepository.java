package com.github.pablwoaraujo.imageliteapi.infra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.pablwoaraujo.imageliteapi.domain.entity.Image;

public interface ImageRepository extends JpaRepository<Image, String> {

}
