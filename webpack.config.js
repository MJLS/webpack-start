// <1> 
const HtmlWebPackPlugin = require('html-webpack-plugin');
//plugin CSS - Global
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//plugin CSS - optimización (minificacion)
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // <2> <2.1>
    mode: 'development',
    //OptimizeCssAssetsPlugin funciona de una manera diferente. Cambiar a modo produccion !!! mode: 'production'

    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },


    module: {
        // <3> <4>
        rules: [

            // <5>
            {
                test: /style\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // <6>
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // <7>
            {

                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            },
            // <8>
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        // <8.1>
                        name: 'assets/[name].[ext]'
                    }
                }]
            }
        ]
    },
    // <9>
    plugins: [
        new HtmlWebPackPlugin({

            template: './src/index.html',

            filename: './index.html'
        }),
        new MiniCssExtractPlugin({

            filename: '[name].css',
            ignoreOrder: false
        })
    ]
};


// <1> Declaramos la variable HtmlWebPackPlugin cargando el paquete html-webpack-plugin
// <2> Establecemos el modo de desarrollo para trabajar con los archivos js con comentarios incluidos por el compilador
// <2.1> En modo production el JS aparecerá minimizado y ofuscado mode: 'production', en modo desarrollo no se minimizará el código y respetará los comentarios.
// <3> "rules" Sirven para decirle a webpack que hacer con cierto tipos de archivos
// <4> Configuracion y paquetes;

/*
 Cuando hagamos build mueva tb la carpeta index.html a la carpeta de distrubución
 - html-loader             ->  Nos permite mover index.html en dist
 - htmls-webpack-plugin    ->  Le dice a webpack que incruste el bundle (main.js) en el index.html
 - webpack-dev-server      ->  Este es el servidor de desarrollo de webpack
 - css-loader              ->  Nos permite leer el archivo inyectarlo y minimizarlo en nuestro boundle
 - style-loader            ->  Copera con css-loader
 - mini-css-extract-plugin ->  Paquete para poder instalar CSS de forma global
 - optimize-css-assets-webpack-plugin ->  Minimizar el código CSS
 - file-loader             ->  Imagenes (cuando webpack no sabe que hacer con algunos archivos)
*/

// <5> CSS Global

/*
{
  //Quiero que cuando encuentres style.css
  test: /style\.css$/,
  //Apliques MiniCssExtractPlugin.loader y css-loader
  use: [MiniCssExtractPlugin.loader, 'css-loader']
}
*/

// <6> Reglas CSS

/*
 {
     test: /\.css$/,
     //Aqui como vamos a recorrer todos los css escluimos css global style.css
     exclude: /style\.css$/,
     use: ['style-loader', 'css-loader']
 }
*/

// <7> HTML

/*
{
  //Le decimos a webpack que aplique esta regla si es un archivo con extensión html
  test: /\.html$/,
  //Qué hacemos cuando encuentre un archivo html ?
  use: [{
      loader: 'html-loader',
      //Queremos que el index y lo html en general esten minimizados. Tb quitaremos los comentarios
      options: {
          //Lo ponemos como false para continuar la clase
          minimize: false
      }
  }]
 },
*/

// <8> Evaluamos cualquier imagen 

/* test: /\.(png|svg|jpg|gif)$/ */

// <8.1> Si lo dejamos sin esta configuración webpack cambiará el nombre de las imágenes por un hash pero si no queremos esa configuración. [name] es para que use el mismo nombre[.ext] misma extensión Podriamos indicar directorios ..etc assets/img...

// <9> Plugins

/*
- HtmlWebPackPlugin

 new HtmlWebPackPlugin({
            //Que archivo quiero coger
            template: './src/index.html',
            //Donde lo quieres colocar
            filename: './index.html'
 })

 - MiniCssExtractPlugin

 new MiniCssExtractPlugin({
            //Este formato lo usaremos solo en producción
            // filename: '[name].[contentHash].css',
            //Nombre del archivo que queremos manejar. //'[name].[contentHash].css' -> main.3d3b474627120f2f2ae0.css crear un archivo con muchos números este Hash nos ayuda a prevenir que el navegador mantenga estos archivos en el caché y solo los cambiará cuando sea necesarios

            //En nuestro index.html ya tenemos el mismo nombre enlazado como hoja de estilo <link href="main.3d3b474627120f2f2ae0.css" rel="stylesheet"></head> de forma automática

            //funciona stile.css
            //filename: 'style.css',
            filename: '[name].css',
            ignoreOrder: false //Para que no nos cierren los warings (?)
})

*/