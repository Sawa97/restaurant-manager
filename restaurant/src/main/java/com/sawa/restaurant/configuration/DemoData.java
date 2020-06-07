package com.sawa.restaurant.configuration;

import com.sawa.restaurant.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DemoData implements CommandLineRunner {


    private final DayPlanService dayPlanService;
    private final DishOrBeverageService dishOrBeverageService;
    private final DispositionService dispositionService;
    private final EmployeeService employeeService;
    private final OrderService orderService;
    private final RestaurantService restaurantService;
    private final TableService tableService;
    private final WorkScheduleService workScheduleService;

    public DemoData(DayPlanService dayPlanService, DishOrBeverageService dishOrBeverageService, DispositionService dispositionService, EmployeeService employeeService, OrderService orderService, RestaurantService restaurantService, TableService tableService, WorkScheduleService workScheduleService) {
        this.dayPlanService = dayPlanService;
        this.dishOrBeverageService = dishOrBeverageService;
        this.dispositionService = dispositionService;
        this.employeeService = employeeService;
        this.orderService = orderService;
        this.restaurantService = restaurantService;
        this.tableService = tableService;
        this.workScheduleService = workScheduleService;
    }

    @Override
    public void run(String... args) throws Exception {
//        Restaurant restaurant = Restaurant.builder().city("Krakow").address("Nowa 2").build();
//        Restaurant restaurant2 = Restaurant.builder().city("Warszawa").address("Nowa 21").build();
//        Employee waiter = Employee.builder().name("Marcin").surname("Sawa").email("malcin12@gmail.com")
//                .role(RoleType.WAITER).phoneNumber("883241445").password("ziom12").restaurant(restaurant).build();
//        Employee manager = Employee.builder().name("Kamil").surname("Sawa").email("malcin13@gmail.com")
//                .role(RoleType.MANAGER).phoneNumber("883241445").password("ziom13").restaurant(restaurant).build();
//        Employee head = Employee.builder().name("Patryk").surname("Sawa").email("malcin14@gmail.com")
//                .role(RoleType.HEAD).phoneNumber("883241445").password("ziom13").build();
//        Employee employee = Employee.builder().name("Łukasz").surname("Sawa").email("malcin15@gmail.com")
//                .role(RoleType.COOK).phoneNumber("883241445").password("ziom13").restaurant(restaurant2).build();
//        Table table = Table.builder().taken(false).capacity(4).number(1).build();
//        Table table2 = Table.builder().taken(false).capacity(3).number(2).build();
//        Table table3 = Table.builder().taken(false).capacity(2).number(3).build();
//        DayPlanForEmployee dayPlanForEmployee = DayPlanForEmployee.builder().employee(waiter).date(LocalDate.now()).startTime(LocalTime.of(11,0)).endTime(LocalTime.of(18,0)).build();
//        Disposition disposition = Disposition.builder().employee(waiter).description("Codziennie 12-20").build();
//        DishOrBeverage dishOrBeverage = DishOrBeverage.builder().name("Zupa chrzanowa").price(12.0).description("Składniczki tu").category(DishCategory.SOUP).build();
//        DishOrBeverage dishOrBeverage1 = DishOrBeverage.builder().name("Schabowy z frytkami").price(24.0).description("Składniczki tu").category(DishCategory.MAIN).build();
//        DishOrBeverage dishOrBeverage2 = DishOrBeverage.builder().name("Cola").price(6.0).category(DishCategory.DRINK).build();
//        DishOrBeverage dishOrBeverage3 = DishOrBeverage.builder().name("Szarlotka").price(24.0).description("Składniczki tu").category(DishCategory.DESSERT).build();
//        Order order = Order.builder().dishes(List.of(dishOrBeverage)).table(table).status(StatusType.IN_PROGRESS).timeToGive(15).price(24.0).additionalComments("Brak").startTime(LocalTime.of(12,0)).endTime(LocalTime.of(13,0)).build();
//        Order order2 = Order.builder().dishes(List.of(dishOrBeverage)).table(table2).status(StatusType.IN_PROGRESS).timeToGive(15).price(11.0).additionalComments("Brak").startTime(LocalTime.of(12,0)).endTime(LocalTime.of(13,0)).build();
//
//
//        restaurantService.addNewElement(restaurant);
//        restaurantService.addNewElement(restaurant2);
//        employeeService.addNewElement(waiter);
//        employeeService.addNewElement(manager);
//        employeeService.addNewElement(employee);
//        employeeService.addNewElement(head);
//        tableService.addNewElement(table);
//        tableService.addNewElement(table2);
//        tableService.addNewElement(table3);
//        dayPlanService.addNewElement(dayPlanForEmployee);
//        dispositionService.addNewElement(disposition);
//        dishOrBeverageService.addNewElement(dishOrBeverage);
//        dishOrBeverageService.addNewElement(dishOrBeverage1);
//        dishOrBeverageService.addNewElement(dishOrBeverage2);
//        dishOrBeverageService.addNewElement(dishOrBeverage3);
//        orderService.addNewElement(order,waiter.getId());
//        orderService.addNewElement(order2,waiter.getId());
//
//
//        restaurant = restaurantService.getAllElements().get(0);
//        restaurant2 = restaurantService.getAllElements().get(1);
//        waiter = employeeService.getElement(1L);
//        manager = employeeService.getElement(2L);
//        table = tableService.getAllElements().get(1);
//        table2 = tableService.getAllElements().get(0);
//        table3 = tableService.getAllElements().get(2);
//        dayPlanForEmployee = dayPlanService.getAllElements().get(0);
//        disposition = dispositionService.getAllElements().get(0);
//
//
//        restaurant2.addEmployee(waiter);
//        restaurant2.addEmployee(employee);
//        restaurant2.setManager(manager);
//        restaurant2.setTables(Set.of(table,table2,table3));
//        waiter.setDisposition(disposition);
//
//        restaurantService.modifyRestaurant(restaurant,restaurant.getId());
//        restaurantService.modifyRestaurant(restaurant2,restaurant2.getId());
//        employeeService.modifyElement(waiter,waiter.getId());
//        dayPlanService.modifyElement(dayPlanForEmployee,dayPlanForEmployee.getId());
  }
}
