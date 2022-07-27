## Desafío: clase 30: Servidor con balance de carga
#### Como ejecutar el programa en su computadora:

Ejecutar "npm install" para instalar las dependecias.

En archivo .env se define la conexion a MongoDB Atlas y se almacena como ejemplo
en la base de datos llamado 'serverprocess' la info del sistema

Ejecutar "npm start" para iniciar el server.

#### Consignas del desafío y las respuestas
* Tomando como base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

Rta:
Se puede ejecutar usando Node:

En modo FORK
```
node app.js --port 3000 --mode FORK
```

En modo CLUSTER
```
node app.js --port 3000 --mode CLUSTER
```
Nota: si no se define el parámetro --port se usa el puerto 8080 por defecto

* Agregar en la vista info, el número de procesadores presentes en el servidor.
Para obtener el número de CPUs se agregó lo siguiente en el código:

```
require('os').cpus().length
```
El resultado es como lo que sigue (la última linea de la info dice número de CPUs)

[![info-desafioclase30.jpg](https://i.postimg.cc/7hVtV13z/info-desafioclase30.jpg)](https://postimg.cc/YLvx2Wy2)

* Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

[![home-desafioclase30.jpg](https://i.postimg.cc/j2tZL8Wf/home-desafioclase30.jpg)](https://postimg.cc/hzZ9Y114)

* Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos fork y cluster. Listar los procesos por PM2 y por sistema operativo.

```
pm2 start app.js --name="server1" --watch -- 3000
pm2 start app.js --name="server2" --watch -i max -- 8081

pm2 list
pm2 monit
tasklist /fi "imagename eq node"
pm2 delete all
```

#### Consignas de la filmina

#### Configuración del archivo de configuración de NGNIX

``` 
events {
}

http {
    include       mime.types;

    upstream node_app {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen 8080;
        location /api/randoms/ {
            proxy_pass http://node_app;
        }
    }

}
``` 