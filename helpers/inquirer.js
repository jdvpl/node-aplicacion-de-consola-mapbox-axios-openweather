const inquirer = require('inquirer');
require('colors');


// preguntas
const preguntas=[
  {
    type: 'list',
    name: 'opcion',
    message:'Que deseas hacer?',
    choices:[
      {
        value: '1',
        name:`${'1.'.green} Crear tarea`,
      },
      {
        value: '2',
        name:`${'2'.green}. Listar tareas`
      },
      {
        value: '3',
        name:`${'3'.green}. Listar completadaas`
      },
      {
        value: '4',
        name:`${'4'.green}. Listar pendientes`
      },
      {
        value: '5',
        name:`${'5'.green}. commpletar tarea(s)`
      },
      {
        value: '6',
        name:`${'6'.green}. borrar tarea(s)`
      },
      {
        value: '0',
        name:`${'0'.green}. Salir`
      },
    ],
  }
]
// /opciones
const inquirerMenu=async()=>{
  console.clear();

  console.log("  ===================".green)
    console.log("       selecciona".white)
    console.log("  ===================\n".green)

  const {opcion}=await inquirer.prompt(preguntas)
  return opcion
}

// para pausar cuando se digie una opcion
const pausa =async()=>{
  const question=[
    {
      type:'input',
      name:'Enter',
      message:`Presiones ${'ENTER'.green} para continuar`
    }
  ]
  console.log('\n');
  await inquirer.prompt(question);

}
// para leer lo que escribe
const leetInput=async(message)=>{
  const question=[
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        if(value.length===0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const {desc}=await inquirer.prompt(question);
  return desc;
}


const listadoTareasBorrar=async(tareas=[])=>{
  // {
  //   value: '2',
  //   name:`${'2'.green}. Listar tareas`
  // },
  const choices=tareas.map( (tarea, i) =>{
    const idx=`${i+1}.`.green
    return{
      value:tarea.id,
      name:` ${idx} ${tarea.desc}`,
    }
  })
  choices.unshift({
    value: '0',
    name:'0.'.green+ ' Cancelar'
  });
  const preguntass=[
    {
      type:'list',
      name:'id',
      message:'Borrar',
      choices
    }
  ]
  const {id}=await inquirer.prompt(preguntass);
  
  return id
}

const mostrarListadoCheckList=async(tareas=[])=>{
  // {
  //   value: '2',
  //   name:`${'2'.green}. Listar tareas`
  // },
  const choices=tareas.map( (tarea, i) =>{
    const idx=`${i+1}.`.green
    return{
      value:tarea.id,
      name:` ${idx} ${tarea.desc}`,
      checked:(tarea.completadoEn)?true:false
    }
  })

  const pregunta=[
    {
      type:'checkbox',
      name:'ids',
      message:'Selecciona',
      choices
    }
  ]
  const {ids}=await inquirer.prompt(pregunta);
  
  return ids
}

const confirmar=async(message)=>{
  const quiestion=[
    {
      type:'confirm',
      name:'ok',
      message
    }
  ];
  const {ok}=await inquirer.prompt(quiestion);
  return ok

}

module.exports ={
  inquirerMenu,
  pausa,
  leetInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
};