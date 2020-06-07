package com.sawa.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Table;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Builder
@Data
@Transactional
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clientOrder")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id", scope = Order.class)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne(fetch = FetchType.EAGER)
    private com.sawa.restaurant.model.Table table;
    @Enumerated(value = EnumType.STRING)
    private StatusType status;
    private int timeToGive;
    private double price;
    private String additionalComments = "Brak";
    private Date date;
    private LocalTime startTime;
    private LocalTime endTime;
    @ManyToMany(fetch = FetchType.LAZY)
    private List<DishOrBeverage> dishes = new ArrayList<>();

    public void addDish(@NotNull DishOrBeverage dishOrBeverage){
        dishes.add(dishOrBeverage);
    }

    public boolean removeDish(@NotNull DishOrBeverage dishOrBeverage){
        return dishes.remove(dishOrBeverage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getStatus(), getTimeToGive(), getPrice(), getAdditionalComments(), getStartTime(), getEndTime());
    }
}
