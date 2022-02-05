const { leetInput } = require("./helpers/inquirer")


const main =async() => {
  const texto=await leetInput("Hola");
  console.log(texto);
}

main()