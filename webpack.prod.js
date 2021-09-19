const HtmlWebPack=require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer=require('css-minimizer-webpack-plugin');
const Terser=require('terser-webpack-plugin');
const path = require('path');

module.exports={
    entry: './src/index.ts',
    mode:"production",
    output:{
        clean:true,
        filename:'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },
    resolve:{
        extensions:['.tsx','.ts','.js']
    },
    module:{
        rules:[
            {
                test:/\.html$/i,
                loader: "html-loader",
                options:{
                    sources:false
                }
            },
            {
                test:/\.css$/,
                exclude:/styles.css$/,
                use:['style-loader','css-loader'],
            },{
                test:/styles.css$/,
                use:[MiniCssExtract.loader,'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                loader:'file-loader'
            },{
                test:/\.m?js$/,
                exclude:/node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
        
    },
    
    plugins:[
        new HtmlWebPack({
            title:'Mi Webpack App',
            template:'./index.html',
            filename:'index.html'
        }),
        new MiniCssExtract({
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),
        new CopyPlugin({
            patterns:[
                {from:'assets',to:'assets/'},
            ]
        })
    ],

}