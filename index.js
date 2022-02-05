const { leetInput,inquirerMenu,pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
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
        const ciudad=await leetInput('Ciudad: ');
        busquedas.ciudad(ciudad);
        // buscar los lugares

        //seleccionar el lugar

        //clima


        //mostrar resultados
        console.log(`\nInformacion de ${ciudad}\n`.green);
        console.log('Ciudad: ');
        console.log('Lat: ');
        console.log('Lng: ');
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

console.log(process.env);
main()