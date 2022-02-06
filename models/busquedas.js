
const fs=require('fs');
const axios = require('axios');
class Busquedas{
  historial=[];

  archivo='./db/db.json';

  constructor(){
    //todo leer db si existe
    this.LeerDb();
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
        speed_wind:wind.speed ?? '',
        pressure:main.pressure,
        humidity:main.humidity,
      }
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar={}){

    let data=[]
    this.historial.map( l=>{
      data.push(l.id);
    })
    if(data.includes(lugar.id)){
      return;
    }
    this.historial.unshift(lugar);
    this.historial=this.historial.splice(0,5);
    // grabar en db
    this.guardarDb();
  }

  guardarDb(){
    const payload={
      historial:this.historial
    }
    fs.writeFileSync(this.archivo,JSON.stringify(payload))
  }

  LeerDb(){
    // si existe
  if(!fs.existsSync(this.archivo)){
    return;
  }

  const info =fs.readFileSync(this.archivo, { encoding: 'utf8'})
  if(!info) return;
  const {historial}=JSON.parse(info);

    this.historial=[...historial]
  }
}

module.exports =Busquedas