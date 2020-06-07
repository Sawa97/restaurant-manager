package com.sawa.restaurant.service;

import com.sawa.restaurant.exception.AlreadyExistException;
import com.sawa.restaurant.exception.NotFoundException;
import com.sawa.restaurant.model.Disposition;
import com.sawa.restaurant.model.Employee;
import com.sawa.restaurant.repository.DispositionRepository;
import com.sawa.restaurant.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DispositionService extends DefaultService<Disposition, DispositionRepository> {

    private final EmployeeRepository employeeRepository;

    public DispositionService(DispositionRepository repository, EmployeeRepository employeeRepository) {
        super(repository);
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Disposition addNewElement(Disposition item) throws AlreadyExistException {
        Optional<Disposition> optional = repository.findByEmployee_Number(item.getEmployee().getNumber());
        if (optional.isPresent()) {
            repository.delete(optional.get());
        }
        Disposition savedDisposition =  repository.save(item);

        Employee employee = employeeRepository.findByNumber(savedDisposition.getEmployee().getNumber()).get();
        employee.setDisposition(savedDisposition);

        return savedDisposition;

    }

    public Disposition getByEmployeeNumber(Long number) throws NotFoundException {
        return repository.findByEmployee_Number(number).orElseThrow(()->new NotFoundException("Disposition not exist"));
    }

    public List<Disposition> getByRestaurant(Long id){
        return repository.findAllByEmployee_Restaurant_Id(id);
    }

    public void deleteByRestaurant(Long id){
        repository.findAllByEmployee_Restaurant_Id(id).forEach(e-> {
            try {
                removeAllConnectings(e.getId());
            } catch (NotFoundException ex) {
                ex.printStackTrace();
            }
        });
        repository.deleteAllByEmployeeRestaurant_Id(id);
    }

    @Override
    public void delete(Long number) throws NotFoundException {
        removeAllConnectings(number);
        super.delete(number);
    }

    public void removeAllConnectings(Long number) throws NotFoundException {
        Disposition disposition = get(number);
        employeeRepository.findAll().stream().filter(s->s.removeDisposition(disposition)).forEach(employeeRepository::save);
    }

    @Override
    public String getExceptionItem() {
        return this.toString();
    }
}
