const inquirer = require("inquirer");
require("colors");

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "que desea hacer",
        choices: [
            {
                value:"1",
                name:`${"1".green}.crear tarea`
            },
            {
                value:"2",
                name:`${"2".green}.listar tareas`
            },
            {
                value:"3",
                name:`${"3".green}.listar tareas completadas`
            },
            {
                value:"4",
                name:`${"4".green}. listar tareas pendientes`
            },
            {
                value:"5",
                name:`${"5".green}.completar tarea(s)`
            },
            {
                value:"6",
                name:`${"6".green}.Borrar tareas`
            },
            {
                value:"0",
                name:`${"0".red}.Salir`
            },
    ]
    }
]


const inquirerMenu = async() => {

        console.clear();

        console.log("===========".green);
        console.log("seleccione una opción".green);
        console.log("===========".green);

        const {opcion} = await inquirer.prompt(preguntas)

        return opcion
}


const pausa = async() => {

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"enter".green} para continuar`,

        }
    ]

    await inquirer.prompt(question)

    
}

const leerInput = async(message) => {

    const question = [
        {
            type: "input",
            name: "desc",
            message: message,
            validate( value ) {
                if(value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc

}


const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (el,index) => {

        const idx = `${index + 1}`.green;
        return {
            value: el.id,
            name: `${ idx } ${el.desc}`
        }
    })

    choices.unshift({
        value: 0,
        name: "0".green = "cancelar"
    });
    

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "borrar",
            choices
        }   
    ]


    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok
}


const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (el,index) => {

        const idx = `${index + 1}`.green;
        
        return {
            value: el.id,
            name: `${ idx } ${el.desc}`,
            checked: (el.completadoEn) ? true : false
        }
    })


    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices
        }   
    ]


    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}


