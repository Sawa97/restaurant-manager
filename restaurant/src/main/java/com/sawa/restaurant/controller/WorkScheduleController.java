package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.WorkSchedule;
import com.sawa.restaurant.service.WorkScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schedules")
@CrossOrigin("http://localhost:3000")
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    public WorkScheduleController(WorkScheduleService workScheduleService) {
        this.workScheduleService = workScheduleService;
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @PutMapping
    public ResponseEntity<WorkSchedule> addSchedule(@RequestBody WorkSchedule workSchedule){
        WorkSchedule createdSchedule = workScheduleService.addNewElement(workSchedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @DeleteMapping("/restaurant/{id}")
    public void deleteSchedule(@PathVariable Long id) throws NotFoundException {
        workScheduleService.deleteByRestaurantNumber(id);
    }

    @PreAuthorize("hasAnyRole('MANAGER','HEAD')")
    @PostMapping("/{id}")
    public ResponseEntity<WorkSchedule> modifySchedule(@RequestBody WorkSchedule workSchedule, @PathVariable Long id) throws NotFoundException {
        WorkSchedule modifiedSchedule = workScheduleService.modifyElement(workSchedule,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(modifiedSchedule);
    }
}
