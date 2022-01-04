'use strict';
var axios = require('axios');
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
const authkey = '5a4dc308-a380-4227-812e-e4e1e22007cb';
let geoserverUrl = "http://localhost:8080/geoserver/wfs?authkey=" + authkey + "&";

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




/*
 * top: north latitude of bounding box.
 * left: left longitude of bounding box (western bound). 
 * bottom: south latitude of the bounding box.
 * right: right longitude of bounding box (eastern bound).
 * latitude: latitude of the point to check.
 * longitude: longitude of the point to check.
 */
function isBounded(latitude, longitude) {
    let top = parseInt(process.env.TOP);
    let left = parseInt(process.env.LEFT);
    let bottom = parseInt(process.env.BOTTOM);
    let right = parseInt(process.env.RIGHT);
    if (top >= latitude && latitude >= bottom) {
        /* If your bounding box doesn't wrap 
           the date line the value
           must be between the bounds.
           If your bounding box does wrap the 
           date line it only needs to be  
           higher than the left bound or 
           lower than the right bound. */
        if (left <= right && left <= longitude && longitude <= right) {
            return true;
        } else if (left > right && (left <= longitude || longitude <= right)) {
            return true;
        }
    }
    return false;
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


    if (isBounded(parseInt(arrivalPoint.lat), parseInt(arrivalPoint.long)) === false) {
        return {
            success: 404,
            body: 'Destination coordinates outside possible area.'
        };
    }

    let origin = await getVertice(startingPoint);
    let destiny = await getVertice(arrivalPoint);

    console.log(origin)
    console.log(destiny)

    let finalDistance;

    try {
        finalDistance = await getRota(origin, destiny);
    } catch (err) {
        console.log(err)
    }

    let timeOfTravel = 5;

    let finalPrice = priceByHourTypeVehicle * finalDistance;


    try {

        const routePrice = new RoutePrice({
            startingPoint: JSON.stringify(startingPoint),
            arrivalPoint: JSON.stringify(arrivalPoint),
            typeOfVehicle: typeOfVehicle,
            distance: finalDistance,
            timeOfTravel: timeOfTravel,
            price: finalPrice.toString()
        });

        console.log(routePrice)


        const finalRoutePrice = await routePrice.save();

        return {
            success: 201,
            body: finalRoutePrice
        };

    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}


async function getRota(destino, origem) {
    let url = `${geoserverUrl}service=WFS&version=1.0.0&request=GetFeature&typeName=arqsistemas:shortest_path&outputformat=application/json&viewparams=source:${origem};target:${destino};`;
    var config = {
        method: 'get',
        url: url,
        headers: {
            'Cookie': 'GS_FLOW_CONTROL=GS_CFLOW_4c5fe8ee:17e2158894b:-8000; GS_FLOW_CONTROL=GS_CFLOW_-4c6c23df:17e26a3e3f0:-7f2d'
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data
        });
    

    let i = 0;
    let distancia = 0;
    while (i < data.features.length) {
        distancia += data.features[i].properties.distance
        i++;
    }

    return distancia.toFixed(2);
}


async function getVertice(pontoSelecionado) {
    let url = `${geoserverUrl}service=WFS&version=1.0.0&request=GetFeature&typeName=arqsistemas:nearest_vertex&outputformat=application/json&viewparams=x:${
		pontoSelecionado.long
	};y:${pontoSelecionado.lat};`;

    

    var config = {
        method: 'get',
        url: url,
        headers: {
            'Cookie': 'GS_FLOW_CONTROL=GS_CFLOW_-4c6c23df:17e26a3e3f0:-7f2d'
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data
        });
    

    let features = data.features;
    return features[0].properties.id;
}