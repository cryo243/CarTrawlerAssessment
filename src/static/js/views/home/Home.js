import App from "../app/App.js";
import CarViewModel from "../../models/CarViewModel.js";


export default class extends App {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    buildList(cars) {
        return `
         ${cars.map((carDetail, index) => {
            return `<li data-link="/details/${index}">
              <img src="${carDetail.pictureUrl}" alt=" car picture" >
              <div>
              <h3>${carDetail.vehMakeModel}</h3>
              <div>
              ${carDetail.currencyCode + carDetail.price}
              </div >
              <div>${carDetail.passengerQuantity} passenger(s)</div>
              <div style="display: flex; justify-content: space-between;">
             ${carDetail.fuelType}  -  ${carDetail.transmissionType}
               </div>
               <h4>${carDetail.vendorName}</h4>
              <div style="color: aquamarine">
              ${carDetail.status}
              </div>
              </div>
           </li>`
        }).join('')}`;
    }
    displayLegend(legend){
        const pickupDate = new Date(legend.pickupDate);
        const returnDate = new Date(legend.returnDate);
        return `
            <div class="legend-container">
              <div class="legend-container-item">
                   <div> Pick up at ${legend.pickupLocation + '  '}</div>
             <div> on ${pickupDate.getDate()}  ${pickupDate.toLocaleString('default', { month: 'long' })}  ${pickupDate.getFullYear()}</div>
           </div  >
                 <div class="legend-container-item">
                   <div> Pick up at ${legend.returnLocation + '  '}</div>
             <div> on ${returnDate.getDate()}  ${returnDate.toLocaleString('default', { month: 'long' })}  ${returnDate.getFullYear()}</div>
           </div>
            </div>
        `
    }

    async getHtml() {
        try {
            const carViewModel = await new CarViewModel().getCarData();
            return ` 
              ${this.getHeader()}
              ${this.displayLegend(carViewModel.legend)}
            <div>
           <ul class="spa-list">
             ${this.buildList(carViewModel.carDetails)}
           </ul>
            </div>
        `;
        } catch (error) {
            return this.render(` 
            <h1>An error occurred  while fetching the data</h1>
            <p>
            ${error}
           </p>
        `);
        }

    }
}