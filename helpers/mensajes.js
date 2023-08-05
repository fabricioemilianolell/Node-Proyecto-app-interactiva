require("colors")

const mostrarMenu = () => {

    return new Promise((resolve) => {
        
        console.clear()
        console.log("===========".green);
        console.log("seleccione una opción".green);
        console.log("===========".green);
    
        console.log(`${"1.".green} Crear tarea`)
        console.log(`${"2.".green} Listar tarea`)
        console.log(`${"3.".green} Listar tareas completadas`)
        console.log(`${"4.".green} Listar tareas pendientes`)
        console.log(`${"5.".green} Completar tareas(s)`)
        console.log(`${"6.".green} Borrar tarea`)
        console.log(`${"0.".green} Salir tarea`)
        
        //crear interfaz
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question("Seleccione una opción: ",(opt) => {
            readLine.close()
            resolve(opt)  
        })

    });

  

}

const pausa = () => {

    return new Promise((resolve, reject) => {
        
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`Presione ${"ENTER".green} para continuar: `,(opt) => {
            readLine.close();
            resolve();
        })
    })

    

}

module.exports = {
    mostrarMenu,
    pausa
}