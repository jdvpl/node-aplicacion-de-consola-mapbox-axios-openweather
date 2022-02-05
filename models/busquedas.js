
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
      }))
      return []; //regresar los lugar con la busqueda
    } catch (error) {
      return []; //regresar
    }

  }
}

module.exports =Busquedas