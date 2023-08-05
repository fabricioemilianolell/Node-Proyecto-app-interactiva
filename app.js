require("colors");

const { guardarDB,leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");


const main = async () => {
    
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB()

    if(tareasDB) { //cargar tareas
        tareas.cargarTareasFromArray(tareasDB)
    }
    
    do {
        //imprimir el menu
        opt = await inquirerMenu()
        
        switch(opt) {
            case "1":
                const desc = await leerInput("descripcion: ")
                tareas.crearTarea(desc)
            break;

            case "2":
                tareas.listadoCompleto()
            break;

            case "3": //listar completadas
                tareas.listarPendientesCompletadas(true)
            break;

            case "4": //listar pendientes 
                tareas.listadoCompleto(false)
            break;
            
            case "5": //completado o pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
            break;

            case "6": //Borrar tareas 
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if(id !== "0") {
                const ok = await confirmar("Estás seguro?")
                if(ok) {
                    tareas.borrarTarea(id)
                    console.log("tarea borrada") 
                } 
                }
                
            break;

        }
        

        guardarDB(tareas.listadoArr)

        await pausa() 

    } while (opt == "0"); 
}


main()

