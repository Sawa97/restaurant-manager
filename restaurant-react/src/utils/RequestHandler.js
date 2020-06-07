import axios from 'axios'
import counterpart from 'counterpart';

export const BASE = 'http://localhost:8010';
export const TOKEN = 'accessToken';
export const ROLE = 'userRole';
export const LANGUAGE = 'language';

const getRequest = (url) => {
    return axios.get(url,{headers: { authorization: localStorage.getItem(TOKEN)}});
};

const deleteRequest = (url) => {
    return axios.delete(url,{headers: { authorization: localStorage.getItem(TOKEN)}});
};

const addRequest = (url,body) => {
    return axios.put(url,body,{headers: { authorization: localStorage.getItem(TOKEN), 'Content-Type': 'application/json'}});
};

const editRequest = (url,body) => {
    return axios.post(url,body,{headers: { authorization: localStorage.getItem(TOKEN), 'Content-Type': 'application/json'}});
};

const getRequestNotAuthenticated = (url) => {
    return axios.get(url);
};


export function getMenu() {
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/dishes"
    );
}

export function setLanguage(){
    if(localStorage.getItem(LANGUAGE)){
        counterpart.setLocale(localStorage.getItem(LANGUAGE));
    }
}

export function setLanguageCookie(value) {
    localStorage.setItem(LANGUAGE,value);
}

export function getCurrentUser(){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/employees/me"
    );
}

export function reset(email){
    return getRequestNotAuthenticated(
        BASE + "/employees/reset/"+email
    );
}

export function deleteDish(name){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return deleteRequest(
        BASE + "/dishes/"+ name
    );
}

export function deleteTable(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return deleteRequest(
        BASE + "/tables/"+ id
    );
}

export function getDish(name){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/dishes/"+name
    );
}

export function getRole(){
    return localStorage.getItem(ROLE);
}

export function addDish(body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/dishes",
        JSON.stringify(body)
    );
}

export function addTable(body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/tables",
        JSON.stringify(body)
    );
}

export function addEmployee(body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/employees",
        JSON.stringify(body)
    );
}

export function editDish(name,body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return editRequest(
        BASE + "/dishes/"+name,
        JSON.stringify(body)
    );
}

export function editRestaurant(id,body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return editRequest(
        BASE + "/restaurants/"+id,
        JSON.stringify(body)
    );
}

export function editEmployee(id,body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return editRequest(
        BASE + "/employees/"+id,
        JSON.stringify(body)
    );
}

export function editOrder(id,body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return editRequest(
        BASE + "/orders/"+id,
        JSON.stringify(body)
    );
}


export function getRestaurants() {
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/restaurants"
    );
}

export function deleteRestaurant(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return deleteRequest(
        BASE + "/restaurants/"+ id
    );
}

export function deleteOrder(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return deleteRequest(
        BASE + "/orders/"+ id
    );
}

export function getRestaurant(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/restaurants/"+id
    );
}

export function getEmployees() {
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/employees"
    );
}

export function getEmployeesNotHired(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/restaurants/employees/"+id
    );
}

export function addRestaurant(body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/restaurants",
        JSON.stringify(body)
    );
}

export function getCurrentUserRestaurantId(){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/employees/me/restaurantNumber"
    );
}

export function addDisposition(body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/disposition",
        JSON.stringify(body)
    );
}

export function getEmployeeSchedules(number){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/plan/"+number,
    );
}

export function getEmployeeOrders(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/orders/waiter/"+id,
    );
}

export function getRestaurantOrders(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/orders/restaurant/"+id,
    );
}

export function getTables(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/tables/restaurant/"+id,
    );
}

export function getRestaurantBalance(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/restaurants/cash/"+id,
    );
}

export function finishOrder(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/orders/end/"+id,
    );
}

export function getEmployeeByOrder(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/orders/employee/"+id,
    );
}

export function getOrders(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return getRequest(
        BASE + "/orders/table/"+id,
    );
}

export function deleteDayPlan(id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return deleteRequest(
        BASE + "/plan/remove/"+ id
    );
}

export function addDayPlan(body){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/plan",
        JSON.stringify(body)
    );
}

export function addOrder(body,id){
    if (!localStorage.getItem(TOKEN)) {
        return Promise.reject("No access token set")
    }

    return addRequest(
        BASE + "/orders/"+id,
        JSON.stringify(body)
    );
}
