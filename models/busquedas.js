
const axios = require('axios');
const tokenMapbox = require('../tokens');

class Busquedas{
  historial=['tegucigalpa',"garzon","Bogota"];

  constructor(){
    //todo leer db si existe
  }

  get paramsMapbox(){
    return  {
      'access_token':tokenMapbox,
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
      console.log(res.data);
      return []; //regresar los lugar con la busqueda
    } catch (error) {
      return []; //regresar
    }

  }
}

module.exports =Busquedas