const {readFile} = require("fs/promises");

exports.load = async(citiesFilename) => {
    
    const str = await readFile(citiesFilename, "utf8");
    return JSON.parse(str);

}
exports.maxTemp = (cities) => Math.max(...cities.map(c => c.main.temp));

exports.minTemp = (cities) => Math.min(...cities.map(c => c.main.temp));

exports.maxTempMin = (cities) => Math.max(...cities.map(c => c.main.temp_min));

exports.minTempMax = (cities) => Math.min(...cities.map(c => c.main.temp_max));

exports.averageTemp = (cities) => cities.reduce((acumulador, e) => acumulador+e.main.temp, 0)/cities.length;
    
exports.warmerAverageTemp = (cities) => {
    const tempMedia = cities.reduce((acumulador, e) => acumulador+e.main.temp, 0)/cities.length;
    return cities.filter(c => c.main.temp > tempMedia).map(c => c.name);
}
exports.maxNorth = (cities) => cities.find(c => c.coord.lat == Math.max(...cities.map(c => c.coord.lat))).name;

exports.maxSouth = (cities) => cities.find(c => c.coord.lat == Math.min(...cities.map(c => c.coord.lat))).name;

exports.gravityCenter = (cities) => {
   let respuesta ={lon:0 ,lat:0};
   respuesta.lat = cities.reduce((acumulador, e) => acumulador+e.coord.lat, 0)/cities.length;
   respuesta.lon = cities.reduce((acumulador, e) => acumulador+e.coord.lon, 0)/cities.length;
   return respuesta;
}

exports.closestGC = (cities) => {
    let lat = cities.reduce((acumulador, e) => acumulador+e.coord.lat, 0)/cities.length;
    let lon = cities.reduce((acumulador, e) => acumulador+e.coord.lon, 0)/cities.length;

    function distancia  (c){
        let y = c.coord.lat - lat;
        let x = c.coord.lon - lon;
        return Math.sqrt(Math.abs(Math.pow(x,2)-Math.pow(y,2)));
    }

    return cities.find(c => distancia(c) == Math.min(...cities.map(c => distancia(c)))).name;

}
