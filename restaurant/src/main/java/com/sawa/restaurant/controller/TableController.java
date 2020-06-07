package com.sawa.restaurant.controller;

import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Table;
import com.sawa.restaurant.requestForm.TableRequest;
import com.sawa.restaurant.service.TableService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tables")
@CrossOrigin("http://localhost:3000")
public class TableController {

    private final TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping("/{id}")
    public Table getTable(@PathVariable Long id) throws NotFoundException {
        return tableService.getElement(id);
    }

    @GetMapping("/restaurant/{id}")
    public List<Table> getTablesByRestaurant(@PathVariable Long id) throws NotFoundException {
        return tableService.getAllByRestaurantId(id);
    }

    @PreAuthorize("hasAnyRole('HEAD')")
    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable Long id) throws NotFoundException {
        tableService.delete(id);
    }

    @PreAuthorize("hasAnyRole('HEAD')")
    @PutMapping
    public ResponseEntity<Table> addTable(@RequestBody TableRequest tableRequest){
        Table createdTable = tableService.addNewTableToRestaurant(tableRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTable);
    }

    @PreAuthorize("hasAnyRole('HEAD')")
    @PostMapping("/{id}")
    public ResponseEntity<Table> modifyTable(@RequestBody Table table,@PathVariable Long id) throws NotFoundException {
        Table modifiedTable = tableService.modifyElement(table,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(modifiedTable);
    }
}
