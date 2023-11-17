package com.github.pablwoaraujo.imageliteapi.application.images;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.github.pablwoaraujo.imageliteapi.domain.entity.Image;
import com.github.pablwoaraujo.imageliteapi.domain.enums.ImageExtension;
import com.github.pablwoaraujo.imageliteapi.domain.service.ImageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/v1/images")
@Slf4j
@RequiredArgsConstructor
public class ImagesController {

    private final ImageService service;
    private final ImageMapper mapper;

    @PostMapping
    public ResponseEntity<String> save(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("tags") List<String> tags) throws IOException {
        log.info("Imagem recebida: name: {}, size: {}", file.getOriginalFilename(), file.getSize());
        log.info("Content Type: {}", file.getContentType());
        log.info("MediaType: {}", MediaType.valueOf(file.getContentType()));

        Image image = mapper.mapToImage(file, name, tags);
        Image savedImage = service.save(image);

        URI imageUri = buildImageURL(savedImage);

        return ResponseEntity.created(imageUri).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id) {
        Optional<Image> possibleImage = service.findById(id);
        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Image image = possibleImage.get();
        ImageExtension extension = image.getExtension();
        String controlName = "inline; filename=\"" + image.getFileName() + "\"";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(extension.getMediaType());
        headers.setContentLength(image.getSize());
        headers.setContentDispositionFormData(controlName, image.getFileName());

        return new ResponseEntity<byte[]>(image.getFile(), headers, HttpStatus.OK);
    }

    private URI buildImageURL(Image image) {
        String imagePath = "/" + image.getId();

        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path(imagePath)
                .build()
                .toUri();
    }
}
