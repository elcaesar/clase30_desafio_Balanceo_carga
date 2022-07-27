const argv = require('yargs')
    .options({
        'p':{
            alias: 'port',
            type: 'number',
            describe: 'Puerto a utilizar',
        }
    })
    .check((argv,options) => {
        if (argv.p && isNaN(argv.p)){
            throw 'El puerto tiene que ser un número';
        }
        return true;
    })
    .argv;

module.exports = argv;