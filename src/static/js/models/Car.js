export default class  Car {
    constructor({vendor, passenger, vehMakeModel, fuelType, price, status, transmissionType, pictureUrl, currency,
                    vendorCode, baggageQuantity, doorCount, code, codeContext}) {
        this.vendorName = vendor;
        this.passengerQuantity = passenger;
        this.vehMakeModel = vehMakeModel;
        this.fuelType = fuelType;
        this.price = price;
        this.status = status;
        this.transmissionType = transmissionType;
        this.pictureUrl = pictureUrl;
        this.currencyCode = currency;
        this.vendorCode = vendorCode;
        this.baggageQuantity = baggageQuantity;
        this.doorCount = doorCount;
        this.code = code;
        this.codeContext = codeContext;
    }
}