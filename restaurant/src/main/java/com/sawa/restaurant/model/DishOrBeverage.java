package com.sawa.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@Builder
@Transactional
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id", scope = DishOrBeverage.class)
public class DishOrBeverage {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    private String name;
    private Double price;
    private String description;
    @Enumerated(value = EnumType.STRING)
    private DishCategory category;



    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getPrice(), getDescription());
    }
}
