# CLASE 17-18: BACKEND Y API's, USO DE POSTMAN

1. ¿Qué es el backend?

El backend corresponde al apartado de la aplicación que los usuarios no ven, donde se encuentra toda la lógica, base de datos, servicios, etc.

2. NodeJS

Corresponde al entorno de ejecución donde aplicaciones programadas en javascript correran. (React o scripts en javascript)

3. NPM

Corresponde al gestor de librerías de NodeJS, permite gestionar los paquetes para desarrollar y construir las aplicaciones, además de configurar las dependencias necesarias.

4. ExpressJS

Corresponde a un framework orientado para el backend. Permite la construcción de aplicaciones y microservicios altamente escalables y de buen rendimiento. Además, permite el desarrollo de aplicaciones api rest.

5. ¿Qué es una API?

Una API (Application Programming Interface) corresponde a un contrato. Este contrato viene a ser el conjunto de recursos (funcionalidades) los cuales son expuestos por una aplicación o servicio para que otro servicio o app pueda interactuar con esta.

6. ¿Qué es REST?

Representational State Transfer Corresponde a un conjunto de límites de arquitectura donde cada desarrollador puede implementarlo de distintas formas para realizar la comunicación cliente y servidor. Para la comunicación se utiliza el protocolo HTTP y los mensajes son de tipo  JSON.

7. Principios REST
- ***Interfaz uniforme***: debe estar basado en recursos y estos deben ser sustantivos en plural, por ejemplo: libros, alumnos.

- ***Stateless***: no debe de tener estados, es decir, las llamadas a la API deben ser independientes.

- ***Operaciones específicas***: cada acción u operación sobre un recurso debe estar bien definido y tener un claro próposito.

- **Sintaxis estandarizada:** cada recurso es accesible únicamente desde su URI.

- **Cliente-servidor**: el servidor hace el procesamiento del API y expone los recursos a los clientes. Los clientes pueden ser una app de celular, aplicación web, un servicio, etc. Es importante que el cliente sea independiente del servidor.
8. ¿Qué es una API RESTFUL?

Es una API construida siguiendo la arquitectura REST.

9. Como hacer una API RESTFUL usando ExpressJS y NodeJS.
- [x] srcConstruir el directorio de trabajo y agregar una carpeta `src`

- [x] Iniciar un proyecto utilizando `npm init` y completar los campos requeridos.

- [x] Configurar el `package.json` para usar ESM. Se debe agregar `"type": "module"`.

- [x] Instalar ExpressJS utilizando `npm i -s express`

- [x] Instalar Nodemon como dependencia de desarrollo, usando `npm i -D nodemon`

- [x] Configurar en el `package.json` los siguientes scripts:
  
  - `"start:dev": "nodemon src/app.js"`
  
  - `"start:prod": "node src/app.js"`

- [x] Crear un archivo `app.js` dentro de `src`  y agregar lo siguiente.
  
  ```javascript
  import express from 'express';
  
  // Se crea una instancia de una aplicación express
  const app = express();
  
  // Se configura un middleware para aceptar requests de tipo JSON
  app.use(express.json())
  
  // Se agrega una ruta (endpoint) por defecto
  app.get( '/', function ( req, res ) {
    return res.send( "Hello world!" );
  } );
  
  // Se inicia la aplicación y se queda escuchando requests
  app.listen( 3000 );
  ```
10. Variables de entorno

Las variables de entorno suelen ser los parámetros de configuración de la aplicación como el puerto donde ejecutarse, usuarios y contraseñas de la base de datos, api keys, etc. Información sensible que no debe ir en el código directamente. Se accede por medio de `process.env` y por cada proyecto se debe usar una archivo `.env`para manejar estas variables de entorno. Las variables de entorno del archivo `.env` deben ser cargadas en `process.env`usando la librería dotenv. Para instalarla se debe usar `npm i -s dotenv `. Para usar estas variables, se debe hacer lo siguiente.

- [x] En la raíz del proyecto generar un archivo `.env` y agregar lo siguiente: `PORT=3000`

- [ ] Dentro de `src`crear una carpeta `config`y dentro crear un archivo `environment.js` con lo siguiente:
  
  ```javascript
  import * as dotenv from 'dotenv'
  
  // Carga las variables de entorno del .env en process.env
  dotenv.config()
  
  export default {
    PORT: process.env.PORT || 4500
  } 
  ```

- [ ] Modificar `app.js` y dejarlo de la siguiente forma.
  
  ```javascript
  import express from 'express';
  import environment from './config/environment.js';
  // Se crea una instancia de una aplicación express
  const app = express();
  
  // Se configura un middleware para aceptar requests de tipo JSON
  app.use( express.json() )
  
  // Se agrega una ruta (endpoint) por defecto
  app.get( '/', function ( req, res ) {
    return res.json( { message: "Hola mundo" } )
  } );
  
  // Se inicia la aplicación y se queda escuchando requests en el puerto 3000
  // Se inicia la aplicación y se queda escuchando requests en el puerto 3000
  app.listen( environment.PORT, () => {
    console.log( `APLICATION INICIARÁ EN EL PUERTO: ${ environment.PORT }` )
  } );
  ```
11. Uso de Rutas para exponer los recursos como API REST.

En express al tener tanta libertad, es importante tener una estructura de directorios definida para que sea facil la modificación o actualización. Además, es importante tener separado en distintos módulos para agrupar código similar o que este relacionado. En este caso, para la integración de rutas, se sugiere generar la siguiente estructura, siguiendo los siguientes pasos:

- [x] Crear dentro de `src` un directorio llamado `resources` los cuales corresponderan a los recursos a exponer para su consumo. En este caso simularemos un recurso que hace alusión a los productos de una tienda.

- [x] Dentro de `resources` crearemos otra carpeta llamada `products` y dentro crearemos la carpeta `routes`

- [x] Dentro de `routes`  crearemos el archivo `products.routes.js`  con la siguiente estructura.
  
  ```javascript
  import { Router } from 'express'
  
  // Definimos la instancia de nuestro express router
  const productsRouter = Router()
  
  // Se define la base de la URI para exponer el servicio
  const baseURI = '/products'
  /* 
    Se configura según el estandar REST los verbos HTTP 
    a vincular para realizar las operaciones CRUD. 
    Los handlers de cada verbo HTTP se deben construir en el controller
    y luego agregarlos aca.
  
    VERBO HTTP              CRUD          Controller handler
       POST      --------> CREATE --------> createProduct
       GET       --------> READ   --------> getProducts / getProductById
       PUT/PATCH --------> UPDATE --------> updateProductById
       DELETE    --------> DELETE --------> deleteProductById
  */
  productsRouter.post( baseURI )
  productsRouter.get( baseURI )
  productsRouter.get( `${ baseURI }/:id` )
  productsRouter.put( `${ baseURI }/:id` )
  productsRouter.patch( `${ baseURI }/:id` )
  productsRouter.delete( `${ baseURI }/:id` )
  
  export default productsRouter
  ```

- [ ] Luego al mismo nivel que `routes` crearemos la carpeta `controllers` 

- [ ] Dentro de `controllers` se creará el siguiente archivo con lo siguiente:
  
  ```javascript
  const products = []
  
  export const createProduct = ( req, res ) => {
    const body = req.body
    products.push( body )
    return res.json( body )
  }
  
  export const getProducts = ( req, res ) => {
    return res.json( products )
  }
  
  export const getProductById = ( req, res ) => {
    const id = req.params.id
    const product = products.find( product => product.id === id )
    return res.json( product )
  }
  
  export const updateProductById = ( req, res ) => {
    const body = req.body
    const id = req.params.id
    const productIndex = products.findIndex( product => product.id === id )
    products[ productIndex ] = body
    return res.json( products[ productIndex ] )
  }
  
  export const deleteProductById = ( req, res ) => {
    const id = req.params.id
    const productIndex = products.findIndex( product => product.id === id )
    const productRemoved = products.splice( productIndex, 1 )[ 0 ]
    return res.json( productRemoved )
  }
  ```

- [ ] Luego, actualizaremos `products.routes.js` para vincular los métodos a las rutas correspondientes. Obteniendose lo siguiente:
  
  ```javascript
  import { Router } from 'express'
  import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/products.controller.js'
  
  // Definimos la instancia de nuestro express router
  const productsRouter = Router()
  
  // Se define la base de la URI para exponet el servicio
  const baseURI = '/products'
  
  /* 
    Se configura según el estandar REST los verbos HTTP 
    a vincular para realizar las operaciones CRUD. 
    Los handlers de cada verbo HTTP se deben construir en el controller
    y luego agregarlos aca.
  
    VERBO HTTP              CRUD          Controller handler
       POST      --------> CREATE --------> createProduct
       GET       --------> READ   --------> getProducts / getProductById
       PUT/PATCH --------> UPDATE --------> updateProductById
       DELETE    --------> DELETE --------> deleteProductById
  */
  productsRouter.post( baseURI, createProduct )
  productsRouter.get( baseURI, getProducts )
  productsRouter.get( `${ baseURI }/:id`, getProductById )
  productsRouter.put( `${ baseURI }/:id`, updateProductById )
  productsRouter.delete( `${ baseURI }/:id`, deleteProductById )
  
  export default productsRouter
  ```

- [ ] Finalmente, actualizaremos `app.js` para integrar las rutas de `products` y de esta forma poder exponerlas. El nuevo archivo debería quedar como lo siguiente.
  
  ```javascript
  import express from 'express';
  import environment from './config/environment.js';
  import productsRouter from './resources/products/routes/products.routes.js';
  // Se crea una instancia de una aplicación express
  const app = express();
  
  // Se configura un middleware para aceptar requests de tipo JSON
  app.use( express.json() )
  
  // Se agrega una ruta (endpoint) por defecto
  app.get( '/', function ( req, res ) {
    return res.json( { message: "Hola mundo" } )
  } );
  
  // Se agrega el endpoint de products
  app.use( productsRouter )
  
  // Se inicia la aplicación y se queda escuchando requests en el puerto 3000
  app.listen( environment.PORT, () => {
    console.log( `APLICATION INICIARÁ EN EL PUERTO: ${ environment.PORT }` )
  } );
  ```

{

"name": "Producto 1",

"description": "Producto de ejemplo",

"price": 5000,

"id": "c68d17f1-cbf1-4698-a9e4-5251d7b628f7"

}
