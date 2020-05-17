//importamos dentro de nuestro js el css que necesitamos

import '../css/comp.css';

//Al compilar con webpack nos dá este error pues no estamos compartiendo la función saludar() pues no le hemos puesto nada.

//Esto es muy interesante pues podemos decirdir que compartir y que no
/* 
Uncaught TypeError: Object(...) is not a function
    at Module.<anonymous> (main.js:1)
    at r (main.js:1)
    at main.js:1
    at main.js:1 
*/

// 


//Para indicar que esta función se puede usar fuera de este archivo lo único que tenemos que poner es la palabra export

export const saludar = nombre => {
    console.log('Creando una etiqueta h1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${nombre} ¿Qué tal estas?`;
    document.body.append(h1);

};

//Ahora todo funciona