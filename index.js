const { leetInput,inquirerMenu,pausa } = require("./helpers/inquirer")


const main =async() => {


  let opt;
  do {

  opt=await inquirerMenu();

    switch (opt) {
      case 1:
        // crear opcion
        const ciudad=await leetInput('Buscar ciudad:');
        console.log(ciudad);
      break;
      case 2:
        console.log("Historial");
      break;
      case 3:
        console.log("");
      break;
  
        

    }
    if (opt !==0) await pausa();
  } while (opt !==3);

}

main()