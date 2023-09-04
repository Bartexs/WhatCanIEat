package com.example.ingredientservice.dto;

import lombok.Builder;

@Builder
public record IngredientDto(int id, String name, String description, String imageUrl, String amountWithUnit, String completeIngredientData) {
}