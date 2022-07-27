const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const ProcessSchema = Schema({
    argumentos: { type: Array },
    plataforma: { type: String },
    versionNode: { type: String },
    memoriaSistema: { type: Number },
    pathRun: { type: String },
    pid: { type: Number },
    projectPath: { type: String },   
    numCPU: { type: Number },   
}, {
    versionKey : false, //para que no aparezca el __v en la bd
    timestamps : true   
})

module.exports = model('Process', ProcessSchema)
