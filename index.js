const { leetInput,inquirerMenu,pausa, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();
require("colors")

const main =async() => {


  let opt;
  do {

    opt=await inquirerMenu();
    const busquedas=new Busquedas();
    switch (opt) {
      case 1:
        // crear opcion
        //mostrar mensaje para que la persona escriba
        const termino=await leetInput('Ciudad: ');
        
        // buscar los lugares
        const lugares=await busquedas.ciudad(termino);
        //seleccionar el lugar
        const idSlected=await listadoLugares(lugares);

        const lugarselected=lugares.find( l=>l.id === idSlected);

        const {name,lat,lng}=lugarselected;

        //clima

        //mostrar resultados
        console.log(`\nInformacion de ${termino}\n`.green);
        console.log('Ciudad: ', name);
        console.log('Lat: ',lat);
        console.log('Lng: ',lng);
        console.log('Temperatura: ');
        console.log('Minima: ');
        console.log('Maxima: ');
      break;
      case 2:
        console.log("Historial");
      break;
      case 3:
        console.log("");
      break;
  
        

    }
    if (opt !==3) await pausa();
  } while (opt !==3);

}

main()