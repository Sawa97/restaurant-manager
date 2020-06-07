package com.sawa.restaurant.requestForm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TableRequest {
    private int number;
    private int capacity;
}
