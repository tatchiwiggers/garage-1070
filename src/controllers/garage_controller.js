import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList", "brand", "model", "owner", "plate"]

  connect() {
    console.log(this.brandTarget)
    // console.log(this.carsListTarget)
    // GET ALL CARS AND DISPLAY INTO THE PAGE
    // 1. Fetch all cars from the API with Ajax GET REQUEST
    this.url = "https://wagon-garage-api.herokuapp.com/884/cars"
    fetch(this.url)
      .then(response => response.json())
      .then((data) => {
        // 2. Iterate over the cars
        data.forEach((car) => {
          // 3. for each card, insert into the page
          this.insertCarCard(car)
        })
      })
  }

  createCar(event) {
    event.preventDefault()
    fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "brand": this.brandTarget.value,
        "model": this.modelTarget.value,
        "owner": this.ownerTarget.value,
        "plate": this.plateTarget.value
      })
    })
      .then (response => response.json())
      .then((data) => {
        this.insertCarCard(data)
      })
      event.currentTarget.reset()
  }

  insertCarCard(car) {
    const carCard = `<div class="car">
                            <div class="car-image">
                              <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
                            </div>
                            <div class="car-info">
                              <h4>${car.brand} ${car.model}</h4>
                              <p><strong>Owner:</strong> ${car.owner}</p>
                              <p><strong>Plate:</strong> ${car.plate}</p>
                            </div>
                          </div>`;
    this.carsListTarget.insertAdjacentHTML('beforeend', carCard);
  }
}
