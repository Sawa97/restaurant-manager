package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Disposition;
import com.sawa.restaurant.service.DispositionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disposition")
@CrossOrigin("http://localhost:3000")
public class DispositionController {

    private final DispositionService dispositionService;

    public DispositionController(DispositionService dispositionService) {
        this.dispositionService = dispositionService;
    }

    @PutMapping
    public ResponseEntity<Disposition> addDisposition(@RequestBody Disposition disposition) throws AlreadyExistException {
        Disposition createdDisposition = dispositionService.addNewElement(disposition);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDisposition);
    }

    @GetMapping("/{id}")
    public Disposition getDispositionByEmployee(@PathVariable Long id) throws NotFoundException {
        return dispositionService.getByEmployeeNumber(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @GetMapping("/restaurant/{id}")
    public List<Disposition> getDispositionsByRestaurant(@PathVariable Long id){
        return dispositionService.getByRestaurant(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @DeleteMapping("/restaurant/{id}")
    public void deleteAllDispositionsByRestaurant(@PathVariable Long id){
        dispositionService.deleteByRestaurant(id);
    }

}
