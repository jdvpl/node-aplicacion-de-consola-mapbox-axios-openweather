const { leetInput,inquirerMenu,pausa, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();
require("colors")

const main =async() => {


  let opt;
  const busquedas=new Busquedas();

  do {

    opt=await inquirerMenu();
    switch (opt) {
      case 1:
        // crear opcion
        //mostrar mensaje para que la persona escriba
        const termino=await leetInput('Ciudad: ');
        
        // buscar los lugares
        const lugares=await busquedas.ciudad(termino);
        //seleccionar el lugar
        const idSlected=await listadoLugares(lugares);

        
          if (idSlected ===0)continue;
          const lugarselected=lugares.find( l=>l.id === idSlected);

          const {name,lat,lng}=lugarselected;
            
          // guardar en db

            let datos=lugarselected;
            
            //clima
            const clima=await busquedas.climePlace(lat,lng);
            //mostrar resultados
            console.log(`\nInformacion de ${termino}\n`.green);
            console.log('Ciudad: ', name.green);
            console.log('Lat: ',lat);
            console.log('Lng: ',lng);
            console.log('Temperatura: ',clima.temp);
            console.log('Minima: ',clima.min);
            console.log('Maxima: ',clima.max);
            console.log('Descricion: ',(clima.desc).blue);
            console.log('Velocidad del viento: ',clima.speed_wind);
            console.log('Presion ',clima.pressure);
            console.log('Humedad ',clima.humidity);

            datos.temp=clima.temp;
            datos.min=clima.min;
            datos.max=clima.max;
            datos.desc=clima.desc;
            datos.speed_wind=clima.speed_wind;
            datos.pressure=clima.pressure;
            datos.humidity=clima.humidity;
            busquedas.agregarHistorial(datos)
      break;
      case 2:

        let numer=0;
        busquedas.historial.forEach( (lugar)=>{
          numer+=1;
          const id=`${numer+1}.`.green
          console.log(`${id} :: Nombre:${lugar.name} :: Estado: ${lugar.desc.blue} :: Temp: ${(lugar.temp +'').yellow} :: Humedad: ${(lugar.humidity+'').gray} :: Presion: ${(lugar.pressure+'').cyan}`);
        })
      break;
      case 3:
        console.log("Muchas gracias.");
      break;
  
        

    }
    if (opt !==3) await pausa();
  } while (opt !==3);

}

main()