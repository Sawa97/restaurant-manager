package com.sawa.restaurant.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Table;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@Builder
@Transactional
@AllArgsConstructor
@NoArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "number")})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id", scope = Employee.class)
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    @Email
    private String email;
    @Enumerated(EnumType.STRING)
    private RoleType role;
    private String phoneNumber;
    private String password;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id")
    @JsonBackReference(value = "employee")
    private Restaurant restaurant;
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long number;
    @JsonManagedReference(value = "dispo")
    @OneToOne(fetch = FetchType.LAZY)
    private Disposition disposition;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();


    public boolean removeDisposition(@NotNull Disposition disposition) {
        if(this.disposition.equals(disposition)){
            this.disposition = null;
            return true;
        }
        else return false;
    }

    public void addOrder(@NotNull Order order) {
        orders.add(order);
    }

    public boolean removeOrder(@NotNull Order order) {
        return orders.remove(order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getSurname(), getEmail(), getRole(), getPhoneNumber(), getPassword(), getNumber());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        return Objects.equals(getNumber(), employee.getNumber());
    }
}
