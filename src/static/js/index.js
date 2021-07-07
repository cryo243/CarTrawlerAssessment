import {initRouter} from "./utilities/router.js";
import Home from "./views/home/Home.js";
import CarDetails from "./views/carDetails/CarDetails.js";

export const routes = [
    { path: "/", view: Home },
    { path: "/details/:id", view: CarDetails },
];

initRouter(routes);