// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers() {
    let customers = this.deliveries().map(delivery => delivery.customer());
    let unique = customers.filter(function (el, index, self) {
      return index === self.indexOf(el)
    });
    return unique;
  }

  meals() {
    let meals = this.deliveries().map(delivery => delivery.meal());
    let unique = meals.filter(function (el, index, self) {
      return index === self.indexOf(el)
    });
    return unique;
  }
}

class Customer {
 constructor(name, neighborhoodId) {
   this.name = name;
   this.neighborhoodId = neighborhoodId;
   this.id = ++customerId;
   store.customers.push(this);
 }

 deliveries() {
   return store.deliveries.filter(delivery => delivery.customerId === this.id)
 }

 meals() {
   return this.deliveries().map(delivery => delivery.meal())
 }

 totalSpent() {
   let orders = this.meals();
   const orderPrices = function (agg, el) {
     return agg + el.price;
   };
   return orders.reduce(orderPrices, 0)
 }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers() {
    let customers = this.deliveries().map(delivery => delivery.customer());
    let unique = customers.filter(function (el, index, self) {
      return index === self.indexOf(el)
    });
    return unique;
  }

  static byPrice() {
    debugger;
    return store.meals.sort((price1, price2) => parseFloat(price2.price) - parseFloat(price1.price))
  }
}

