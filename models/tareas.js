const Tarea = require("./tarea")

class Tareas {

    _listado = {
        "abc":123
    }


    get listadoArr() {
      
        const listado = []

        Object.keys(this._listado).forEach(el => {
            const tarea = this._listado[el]
            listado.push(tarea)
        })

        return listado;
    }


    constructor() {
        this._listado = {}
    }

    borrarTarea(id = "") {
        if(this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(el => {
            this._listado[el.id] = el
        })
    }

    crearTarea(desc = ""){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        console.log(this._listado)

        this.listadoArr.forEach( (el,index) =>{
            
            const idx = `${index + 1}`.green;
            const { desc,completadoEn } = el; 
            const estado =  completadoEn ? "completado".green : "pendiente".red
            console.log(`${idx} ${desc} :: ${estado}`)
        })
    } 


    listarPendientesCompletadas(completadas = true) {

        let contador = 0;
       this.listadoArr.forEach( (el) => {
        
        const {desc,completadoEn} = el;
        const estado = completadoEn ? "completado".green : "pendiente".red
        
        if(completadas) {
            //mostras completadas
            if(completadoEn) {
                contador += 1
                console.log(`${ (contador + ".").green } ${desc} :: ${completadoEn.green}`)
            }
        } else {
            //mostras pendientes
            if(!completadoEn) {
                contador += 1
                console.log(`${ (contador + ".").green } ${desc} :: ${estado}`)
            }
        }


    }) 

    }

    toggleCompletadas(ids = []) {

       ids.forEach(el => {

        const tarea = this._listado[el]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
       })

       this.listadoArr.forEach( el =>{
        
        if(!ids.includes(el.id)) {
            const tarea = this._listado[el.id]
            tarea.completadoEn = null;
        }
       })
        
    }

}


module.exports = Tareas



