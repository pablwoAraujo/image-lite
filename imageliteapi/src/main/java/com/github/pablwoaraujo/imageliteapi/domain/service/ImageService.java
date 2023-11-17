package com.github.pablwoaraujo.imageliteapi.domain.service;

import java.util.List;
import java.util.Optional;

import com.github.pablwoaraujo.imageliteapi.domain.entity.Image;
import com.github.pablwoaraujo.imageliteapi.domain.enums.ImageExtension;

public interface ImageService {
    Image save(Image image);

    Optional<Image> findById(String id);

    List<Image> search(ImageExtension extension, String quey);
}
