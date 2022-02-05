
const axios = require('axios');

class Busquedas{
  historial=['tegucigalpa',"garzon","Bogota"];

  constructor(){
    //todo leer db si existe
  }

  get paramsMapbox(){
    return  {
      'access_token':process.env.MAPBOX_KEY,
      'limit':10,
      'language':'es'
    }
  }
  async ciudad(lugar=''){
    //peticion http

    try {
      const instance=axios.create({
        baseURL: `https://api.mapbox.com/`,
        params:this.paramsMapbox
      })
      const res=await instance.get(`geocoding/v5/mapbox.places/${lugar}.json`);
      return res.data.features.map(lugar =>({
        id:lugar.id,
        name:lugar.place_name,
        // en mapbox es alcontrario que google map primero va lng y luego lat
        lng:lugar.center[0],
        lat:lugar.center[1],
      })) //regresar los lugar con la busqueda
    } catch (error) {
      return []; //regresar
    }

  }

  get paramsOpenWeather(){
    return  {
      'appid':process.env.OPENWEATHER_KEY,
      'units':'metric',
      'lang':'es'
    }
  }

  async climePlace(lat,lon){
    try {
      //crear instancia de axios
      const instance=axios.create({
        baseURL: `https://api.openweathermap.org/`,
        params:{...this.paramsOpenWeather,lat,lon},
      });

      //tepuesta extrarer la info


      //retornar objeto la descripcion



      
      const res=await instance.get(`data/2.5/weather`);

      const {weather,main,wind} =res.data

      return {
        desc:weather[0].description,
        min:main.temp_min,
        temp:main.temp,
        max:main.temp_max,
        speed_wind:wind.speed,
        pressure:main.pressure,
        humidity:main.humidity,
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports =Busquedas