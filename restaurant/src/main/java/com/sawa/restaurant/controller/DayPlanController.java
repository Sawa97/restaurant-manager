package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.DayPlanForEmployee;
import com.sawa.restaurant.service.DayPlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/plan")
@CrossOrigin("http://localhost:3000")
public class DayPlanController {

    private final DayPlanService dayPlanService;

    public DayPlanController(DayPlanService dayPlanService) {
        this.dayPlanService = dayPlanService;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping
    public ResponseEntity<DayPlanForEmployee> addDayPlan(@RequestBody @Valid DayPlanForEmployee dayPlanForEmployee) {
        DayPlanForEmployee createdDayPlanForEmployee = dayPlanService.addNewElement(dayPlanForEmployee);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDayPlanForEmployee);
    }

    @GetMapping("/{id}")
    public List<DayPlanForEmployee> getAllByEmployee(@PathVariable Long id) {
        return dayPlanService.getAllElementsByEmployee(id);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/removeAll")
    public void deleteAllDayPlans() {
        dayPlanService.deleteAllPrevious();
    }

    @PreAuthorize("hasRole('MANAGER')")
    @DeleteMapping("/remove/{id}")
    public void deleteDayPlan(@PathVariable Long id) throws NotFoundException {
        dayPlanService.delete(id);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/{id}")
    public ResponseEntity<DayPlanForEmployee> modifyPlan(@RequestBody DayPlanForEmployee dayPlanForEmployee, @PathVariable Long id) throws NotFoundException {
        DayPlanForEmployee modifiedDayPlan = dayPlanService.modifyElement(dayPlanForEmployee, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(modifiedDayPlan);
    }
}
