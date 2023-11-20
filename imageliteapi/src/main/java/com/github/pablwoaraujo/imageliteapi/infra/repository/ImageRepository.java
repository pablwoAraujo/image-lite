package com.github.pablwoaraujo.imageliteapi.infra.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import com.github.pablwoaraujo.imageliteapi.domain.entity.Image;
import com.github.pablwoaraujo.imageliteapi.domain.enums.ImageExtension;

import static com.github.pablwoaraujo.imageliteapi.infra.repository.specs.ImageSpecs.*;
import static com.github.pablwoaraujo.imageliteapi.infra.repository.specs.GenericSpecs.*;

public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {

    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtension extension, String query) {
        Specification<Image> spec = Specification.where(conjunction());

        if (extension != null) {
            spec = spec.and(extensionEqual(extension));
        }

        if (StringUtils.hasText(query)) {
            Specification<Image> nameOrTagsLike = Specification.anyOf(nameLike(query), tagsLike(query));
            spec = spec.and(nameOrTagsLike);
        }

        return findAll(spec);
    }
}
