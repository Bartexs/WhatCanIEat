package com.recipeservice.dto;

public record IngredientDto(int id, String name, String description, String imageUrl, String amountWithUnit, String completeIngredientData) {
}