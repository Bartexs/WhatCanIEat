package com.example.ingredientservice.controller;

import com.example.ingredientservice.dto.BasicIngredientDto;
import com.example.ingredientservice.service.BasicIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v2/basic-ingredients")
@CrossOrigin
public class BasicIngredientController {

    private final BasicIngredientService ingredientService;

    @Autowired
    public BasicIngredientController(BasicIngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }


    @GetMapping("/{ingredientId}")
    public ResponseEntity<BasicIngredientDto> getRecipeIngredientById(@PathVariable int ingredientId){
        Optional<BasicIngredientDto> ingredient = ingredientService.getBasicIngredientById(ingredientId);
        return ingredient.map(basicIngredientDto -> ResponseEntity
                .status(HttpStatus.OK)
                .body(basicIngredientDto))
                .orElseGet(() -> ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .build());
    }

    @GetMapping("/name/{ingredientName}")
    public ResponseEntity<BasicIngredientDto> getBasicIngredientByName(@PathVariable String ingredientName){
        Optional<BasicIngredientDto> ingredient = ingredientService.getBasicIngredientByName(ingredientName);
        return ingredient.map(basicIngredientDto -> ResponseEntity
                .status(HttpStatus.OK)
                .body(basicIngredientDto))
                .orElseGet(() -> ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .build());
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<String> getHardcodedIngredients() {
        String json = "[{ \"id\": 21, \"name\": \"Asparagus\", \"amount\": 100, \"unitMeasure\": \"g\" }, { \"id\": 22, \"name\": \"Carrot\", \"amount\": 200, \"unitMeasure\": \"g\" }]";
        return new ResponseEntity<>(json, HttpStatus.OK);
    }
}