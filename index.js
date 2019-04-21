// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {

  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    );
  }

  //no need the Delivery, use the Relationships between customer and neighborhood
  customers() {
    return store.customers.filter(
      function(customer){
        return customer.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  // if use deliveries, the list will have duplicate meals.
  meals() {
    let allMeals = this.deliveries().map(
      function(delivery){
        return delivery.meal();
      }
    )
    return [...new Set(allMeals)];
    
  }

} //end of Neighborhood


let customerId = 0;

// a customer belongs to a neighborhood, customeor class  should contails the foreign key;

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery){
        return delivery.customerId === this.id;
      }.bind(this)
    )
  }

  meals() {     //get custmomer's deliveries, then get delivery's meal.
    return this.deliveries().map(
      function(delivery) {
        return delivery.meal();
      })
  }

  totalSpent() {
    return this.meals().reduce(
      function(agg, el, i, arr) {
      return agg += el.price;
    }, 0)
  }
} //end of class Customer

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    )
  }

  customers() {   //get to delivery istance, use delivery.customer() method to get customer
    return this.deliveries().map(
      function(delivery){
        return delivery.customer();
      }
    )
  }

  static byPrice() {    //decending orders
    return store.meals.sort(
      function(m1, m2) {
        return m2.price - m1.price;
      }
    )
  }

} //end of Meal

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  customer(){
      return store.customers.find(function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood){
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    )
  }

  meal() {
    return store.meals.find(
      function(meal){
        return meal.id === this.mealId;
      }.bind(this)
    )
  }

} //end of Delivery
