const Process = require('../models/process.model')
const process = require('process');

//console.log(`numero de CPU: ${cantCPU}`);
const { fork } = require('child_process')

const homeGet = (req,res) => {
    const PORT =parseInt(process.argv.slice(3))
    console.log(PORT)
    res.render('process/home', {PORT : PORT , process : process.pid})
}

const infoGet = async (req,res) => {
    const info = {
        arguments    :process.argv.slice(2),
        platform     :process.platform,
        nodeVersion  :process.version,
        systemMemory :process.memoryUsage().rss,
        pathRun      :process.execPath,
        pid          :process.pid,
        projectPath  :process.cwd(),
        numCPU       : require('os').cpus().length
    }
    //se guarda en la BD en mongo la info de proceso del sistema
    
    const {arguments, platform, nodeVersion, systemMemory, pathRun, pid, projectPath, cantCPU } = info
    const newProcess = new Process({ argumentos: arguments, 
                                     plataforma: platform, 
                                     versionNode: nodeVersion, 
                                     memoriaSistema: systemMemory, 
                                     pathRun: pathRun, 
                                     pid: pid, 
                                     projectPath: projectPath,
                                     numCPU: cantCPU
                                    })
    await newProcess.save()
    res.render('process/info', info)
}

const randomsGet = (req,res) => {
    //Cantidad de iteraciones
    const cantidadIteraciones = req.query.cant || 100000000;
    const randomFork = fork('helpers/random.js')
    randomFork.on('message', (result) => {
        //Aca se obtiene la respuesta del proceso secundario
        //return res.status(200).json(result);
        
        return res.render('process/randoms', {resultado : result})
    })
    
    //Aca se envia el pedido al proceso secundario
    randomFork.send(cantidadIteraciones);

    //res.render('process/randoms')
}

module.exports = {
    homeGet,
    infoGet,
    randomsGet
}