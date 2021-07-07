import Car from "./Car.js";
import {Legend} from "./Legend.js";
import {getCarDetails} from "../apis/carApis.js";
/**
 * This class holds a singleton implementation of the car view model used by both the details screen and the home screen
 * */
let instance = null;
export default class CarViewModel {

    constructor() {
        if (!instance) {
            instance = this;
            this.legend = null;
            this.carDetails = null;
        }
        return instance;
    }

    _sortByPrice(a, b) {
        return a.price - b.price;
    }


    _getCarItems(carsList) {
        return carsList.reduce((prev, current) => {
            return [...prev, ...current.VehAvails.map((item) => {
                return new Car({
                    currency: item.TotalCharge["@CurrencyCode"],
                    pictureUrl: item.Vehicle.PictureURL,
                    status: item["@Status"],
                    fuelType: item.Vehicle["@FuelType"],
                    passenger: item.Vehicle["@PassengerQuantity"],
                    price: parseInt(item.TotalCharge["@EstimatedTotalAmount"]),
                    transmissionType: item.Vehicle["@TransmissionType"],
                    vehMakeModel: item.Vehicle.VehMakeModel["@Name"],
                    vendor: current.Vendor["@Name"],
                    code: item.Vehicle["@Code"],
                    codeContext: item.Vehicle["@CodeContext"],
                    doorCount: item.Vehicle["@DoorCount"],
                    vendorCode: current.Vendor["@Code"],
                    baggageQuantity: item.Vehicle["@BaggageQuantity"]
                })
            })];
        }, []).sort(this._sortByPrice);
    }

    _extractLegend(detailsCore) {
        return new Legend(detailsCore.PickUpLocation["@Name"],
            detailsCore["@PickUpDateTime"], detailsCore.ReturnLocation["@Name"], detailsCore["@ReturnDateTime"]);
    }

    async getCarData() {
        try {
            const carData = await getCarDetails();
            this.legend = this._extractLegend(carData[0].VehAvailRSCore.VehRentalCore);
            this.carDetails = this._getCarItems(carData[0].VehAvailRSCore.VehVendorAvails);
            return {legend: this.legend, carDetails: this.carDetails};
        } catch (e) {
            throw  e;
        }
    }

    async getCarDetailsByIndex(index) {
        try {
            if (!this.carDetails) {
                await this.getCarData();
            }
            return this.carDetails[index];
        } catch (e) {
            throw  e;
        }

    }


}

