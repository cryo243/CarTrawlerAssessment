const handleErrors = (response)=> {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
const BASE_URL = 'http://www.cartrawler.com';
export  const getCarDetails = () => {
    const url = `${BASE_URL}/ctabe/cars.json`;
    return fetch(url)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        }).catch((error) => {
            alert(error);
        });
}