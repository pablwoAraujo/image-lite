package com.github.pablwoaraujo.imageliteapi.application.images;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pablwoaraujo.imageliteapi.domain.entity.Image;
import com.github.pablwoaraujo.imageliteapi.domain.service.ImageService;
import com.github.pablwoaraujo.imageliteapi.infra.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    @Autowired
    private final ImageRepository repository;

    @Override
    @Transactional
    public Image save(Image image) {
        return repository.save(image);
    }
}
