/*
1. o serviço que possibilite o cálculo do caminho mais curto e respetiva
distância entre dois pontos (origem/destino), onde tecnologia como o PostGIS e GeoServer
poderão ser adequadas

https://locationiq.com/sandbox/routing/optimize

2. as várias tipologias de veículos devem
dispor de preçários diferentes 

a minha tipologia 

3. deverá ser definido um critério de
cálculo do período de utilização (por distância do percurso que pretende realizar, por tempo,
outro)

o meu criterio é duracao x preço por minuto do automovel 

*/

const RoutePrice = require('../../models/v1/RoutePrice');

//get all previously calculated routes
exports.getAll = async function () {
    try {
        const routes = await RoutePrice.find();
        if (!(routes.length)) {
            return {
                success: 204,
                body: "There's no routes registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: routes
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//create new route
exports.addRoutePrice = async function (startingPoint, arrivalPoint, typeOfVehicle, priceByHourTypeVehicle) {
    

    /*

    startingPoint, arrivalPoint, timeOfTravel, price, typeOfVehicle

    distance and timeOfTravel will be obtained via API

    // get lag and lat = https://geocode.xyz/Viana%20do%20Castelo?region=EU&geoit=json
    
    // https://locationiq.com/sandbox/routing/optimize get distance bettewen two points + faster route + duration

    5000 requests by day
    
    */

    //fake data
    let distance = 5;
    let timeOfTravel = 5;

    let finalPrice = priceByHourTypeVehicle * distance; 

    try {

        const routePrice = new RoutePrice({
            startingPoint : startingPoint,
            arrivalPoint : arrivalPoint,
            typeOfVehicle : typeOfVehicle,
            distance : distance,
            timeOfTravel : timeOfTravel,
            price : finalPrice
        });



        const finalRoutePrice = await routePrice.save();

        return { success: 201, body: finalRoutePrice };

    } catch (err) {
        return { success: 400, body: err };
    }
}
