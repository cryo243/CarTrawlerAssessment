import App from "../app/App.js";
import CarViewModel from "../../models/CarViewModel.js";

export default class extends App {
    constructor(params) {
        super(params);
        this.carIndex = params.id;
        this.setTitle("Details");
    }

    async getHtml() {
        const carDetails = await new CarViewModel().getCarDetailsByIndex(this.carIndex);
        return `
           ${this.getHeader()}
            <div class="car-details-container">
            <div  class="car-details-container-item">
               <img src="${carDetails.pictureUrl}" alt="car picture">
             <h1>${carDetails.vehMakeModel}</h1>
              <div class="car-details-properties">
              <div>Vendor:</div>
              <div>${carDetails.vendorName}</div>
              </div>
             <div class="car-details-properties">
              <div>Vendor code:</div>
              <div>${carDetails.vendorCode}</div>
             </div>
            <div class="car-details-properties">
              <div>Transmission type:</div>
              <div>${carDetails.transmissionType}</div>
             </div>
           <div class="car-details-properties">
              <div>Price:</div>
              <div>${carDetails.currencyCode + carDetails.price}</div>
             </div>
           <div class="car-details-properties">
              <div>Baggage quantity:</div>
              <div>${carDetails.baggageQuantity}</div>
             </div>
           <div class="car-details-properties">
              <div>Number of passenger :</div>
              <div>${carDetails.passengerQuantity}</div>
             </div>
           <div class="car-details-properties">
              <div>Number of doors:</div>
              <div>${carDetails.doorCount}</div>
             </div>
           <div class="car-details-properties">
              <div>Vehicle code:</div>
              <div>${carDetails.code}</div>
             </div>
            <div class="car-details-properties">
              <div>Code context:</div>
              <div>${carDetails.codeContext}</div>
             </div>
         </div>
          
           </div>
           
        `;
    }
}