package com.sawa.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Builder
@Transactional
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id", scope = Restaurant.class)
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String city;
    private String address;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "manager_id")
    @JsonManagedReference(value = "employee")
    private Employee manager;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonManagedReference(value = "employee")
    private Set<Employee> employees = new HashSet<>();
    @OneToMany(fetch = FetchType.EAGER)
    private Set<Table> tables =  new HashSet<>();
    @OneToOne
    @JoinColumn(name = "schedule_id")
    private WorkSchedule schedule;

    public void addEmployee(@NotNull Employee employee){
        employees.add(employee);
    }

    public boolean removeEmployee(@NotNull Employee employee){
       return employees.remove(employee);
    }

    public void addTable(@NotNull Table table){
        tables.add(table);
    }

    public boolean removeTable(@NotNull Table table){
        return tables.remove(table);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCity(), getAddress());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Restaurant)) return false;
        Restaurant that = (Restaurant) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getCity(), that.getCity()) &&
                Objects.equals(getAddress(), that.getAddress());
    }
}
