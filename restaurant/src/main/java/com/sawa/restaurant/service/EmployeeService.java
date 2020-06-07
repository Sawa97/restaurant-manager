package com.sawa.restaurant.service;


import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.repository.EmployeeRepository;
import com.sawa.restaurant.repository.OrderRepository;
import com.sawa.restaurant.repository.RestaurantRepository;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService extends DefaultService<Employee, EmployeeRepository> {

    private final DayPlanService dayPlanService;
    private final DispositionService dispositionService;
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;


    public EmployeeService(EmployeeRepository repository, DayPlanService dayPlanService, DispositionService dispositionService, OrderRepository orderRepository, RestaurantRepository restaurantRepository, PasswordEncoder passwordEncoder, EmailSenderService emailSenderService) {
        super(repository);
        this.dayPlanService = dayPlanService;
        this.dispositionService = dispositionService;
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
    }

    @Override
    public Employee get(Long number) throws NotFoundException {
        return repository.findByNumber(number).orElseThrow(() -> new NotFoundException("Employee not exist"));
    }

    public Employee getByEmail(String email) throws NotFoundException {
        return repository.findByEmail(email).orElseThrow(() -> new NotFoundException("Employee not exist"));
    }

    @Override
    public void delete(Long number) throws NotFoundException {
        removeAllConnectings(number);
        repository.deleteByNumber(number);
    }


    public Employee modify(Employee item, Long id) throws NotFoundException {
        Employee employee = repository.findById(id).get();

        if (item.getSurname() != null && !item.getSurname().isEmpty()) {
            employee.setName(item.getName());
            employee.setSurname(item.getSurname());
            employee.setEmail(item.getEmail());
            employee.setPhoneNumber(item.getPhoneNumber());
        }
        if (item.getPassword() != null && !item.getPassword().isEmpty()) {
            employee.setPassword(passwordEncoder.encode(item.getPassword()));
        }
        return repository.save(employee);
    }

    @Override
    public Employee addNewElement(Employee item) throws Exception {
        if (item.getPassword() == null || item.getPassword().equals("")) {
            String password = generateRandomSpecialCharacters();
            item.setPassword(password);
            emailSenderService.sendCreationAccountMail(item.getEmail(), password);
        }

        Long number = Long.valueOf(repository.findAll().stream().map(Employee::getNumber).mapToInt(Long::intValue)
                .max().orElse(0) + 1);

        item.setPassword(passwordEncoder.encode(item.getPassword()));

        item.setNumber(number);
        return repository.save(item);
    }

    public boolean resetUserPassword(String email) throws Exception {
        Optional<Employee> optionalEmployee = repository.findByEmail(email);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            String password = generateRandomSpecialCharacters();
            employee.setPassword(passwordEncoder.encode(password));
            emailSenderService.sendPasswordRemind(employee.getEmail(), password);
            return true;
        }
        return false;
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        Employee employee = get(number);
        dayPlanService.getAllElements().stream().filter(s -> s.getEmployee().equals(employee)).forEach(e -> {
            try {
                dayPlanService.delete(e.getId());
            } catch (NotFoundException ex) {
                ex.printStackTrace();
            }
        });

        dispositionService.getAllElements().stream().filter(s -> s.getEmployee().equals(employee)).forEach(e -> {
            try {
                dispositionService.delete(e.getId());
            } catch (NotFoundException ex) {
                ex.printStackTrace();
            }
        });

        restaurantRepository.findAll().stream().filter(s -> s.removeEmployee(employee)).forEach(restaurantRepository::save);
    }


    @Override
    public String getExceptionItem() {
        return this.toString();
    }

    public String generateRandomSpecialCharacters() {
        RandomStringGenerator pwdGenerator = new RandomStringGenerator.Builder().withinRange(33, 122)
                .build();
        return pwdGenerator.generate(6);
    }
}
