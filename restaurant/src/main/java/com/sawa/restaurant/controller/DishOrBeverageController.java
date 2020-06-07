package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.DishOrBeverage;
import com.sawa.restaurant.service.DishOrBeverageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dishes")
@CrossOrigin("http://localhost:3000")
public class DishOrBeverageController {

    private final DishOrBeverageService dishOrBeverageService;

    public DishOrBeverageController(DishOrBeverageService dishOrBeverageService) {
        this.dishOrBeverageService = dishOrBeverageService;
    }

    @GetMapping
    public List<DishOrBeverage> getMenu(){
        return dishOrBeverageService.getAllElements();
    }

    @GetMapping("/{name}")
    public DishOrBeverage getByName(@PathVariable String name) throws NotFoundException {
        return dishOrBeverageService.getByName(name);
    }

    @PreAuthorize("hasRole('HEAD')")
    @PutMapping
    public ResponseEntity<DishOrBeverage> addNew(@RequestBody DishOrBeverage dishOrBeverage) throws AlreadyExistException {
        DishOrBeverage createdDish = dishOrBeverageService.addNewElement(dishOrBeverage);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDish);
    }

    @PreAuthorize("hasRole('HEAD')")
    @PostMapping("/{name}")
    public ResponseEntity<DishOrBeverage> modifyDish(@RequestBody DishOrBeverage dishOrBeverage,@PathVariable String name) throws NotFoundException {
        DishOrBeverage modified = dishOrBeverageService.modifyByName(dishOrBeverage,name);
        return ResponseEntity.status(HttpStatus.CREATED).body(modified);
    }

    @PreAuthorize("hasRole('HEAD')")
    @DeleteMapping("/{name}")
    public void deleteDish(@PathVariable String name) throws NotFoundException {
        dishOrBeverageService.deleteByName(name);
    }


}
