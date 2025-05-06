import express from 'express';
import http from 'http';
import path from 'path';
import {PythonShell} from "python-shell";
import {promises as fs2} from 'fs';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { Server } from "socket.io"
import mqtt from 'mqtt';
import bcryptjs from 'bcryptjs';
import session from 'express-session';
import mysql from 'mysql';
import { setTimeout } from 'timers';
import { setInterval } from 'timers';
//const { Server } = require("socket.io");
function tiempo (t) {

    function ceros(c) {
      return (c<10? '0':'') + c
    }
        var ms = t % 1000
        t = (t - ms) / 1000
        var secs = t % 60
        t = (t - secs) / 60
        var mins = t % 60
        var hrs = (t - mins) / 60
        return ceros(hrs) + ':' + ceros(mins) + ':' + ceros(secs)+ '.' + ceros(ms)
      }

var flag
var client
var diferencia
var inicio, fin
var fE, fR, ver, foto, num, rfide, rfidr
var RFID_lectura = "0100" + "0000000000000" + "000000000000000000000000";
var RFID_vacio = "0000000000000000000000000000000000000000000000000000000000000000";
var dir
var msj
var cambios='Primer tiempo'
var cambios1='Segundo tiempo'
var cambios2='Tercer tiempo'
var cambios3='Cuarto tiempo'
var boton='0'
var tarea1,tareaI,tarea2,tarea3,tarea4,esp1,esp2,esp3,esp4
var lista_filtrada,lista_filtradaT
var flag;
var nPieza
var mosco;
var error=false
var c=0
var inicio, tiempo1, tiempo2,tiempo3,tiempo4,fin
//#### CAMARAS #######
const camara1 = "172.20.208.204"
const camara2 = "172.20.208.205"
const camara3 = "172.20.208.206"
const camara4 = "172.20.208.207"
const camara5 = "172.20.208.208"
//#### DIRECCION  DE CARPETAS ####
const carpeta_camara1 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.204" 
const carpeta_camara2 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.205" 
const carpeta_camara3 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.206" 
const carpeta_camara4 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.207" 
const carpeta_camara5 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.208" 

//#### FOTOS CAMARAS ######
var cam1 = "172.20.208.204/"
var cam2 = "172.20.208.205/"
var cam3 = "172.20.208.205/"
var cam4 = "172.20.208.205/"
var cam5 = "172.20.208.205/"
var cam
var dir_cam1 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.204"
var dir_cam2 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.205"
var dir_cam3 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.206"
var dir_cam4 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.207"
var dir_cam5 = "C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/172.20.208.208"
var imagen1, imagen2="mesa10.png", imagen3="mesa10.png",imagen4="mesa10.png",imagen5="mesa10.png"
function detectar(mesa){
    if(mesa=='Mesa 1'){
        dir=dir_cam1
        cam=cam1
    }else if(mesa=='Mesa 2'){
        dir=dir_cam2
        cam=cam2
    }else if(mesa=='Mesa 3'){
        dir=dir_cam3
        cam=cam3
    }else if(mesa=='Mesa 4'){
        dir=dir_cam4
        cam=cam4
    }else if(mesa=='Mesa 5'){
        dir=dir_cam5
        cam=cam5
    }
}
const app = express();
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = "172.20.208.30";
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")))

var ip = "http://172.20.208.30:3000/"
const puerto = 3000

const conexion = mysql.createConnection({
    //host: process.env.DB_HOST,
    //user: process.env.DB_USER,
    //password: process.env.DB_PASSWORD,
    //database: process.env.DB_DATABASE
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'sesiones'
});

conexion.connect((error) => {
    if(error){
        console.log(error);
    }
    console.log("SQL");
});

app.get('/registro',(req,res)=>{
    res.render('registro');
})

app.post('/registros', async (req,res)=>{
    try{
         const aut= req.body.auto;
    if(aut=="449"){
     const user=req.body.user;
     const pass=req.body.pass;
     let passwordHash= await bcryptjs.hash(pass, 8);
     conexion.query('INSERT INTO registros SET ?', {usuario:user,password:pass}, async(error, results)=>{
         if(error){
             console.log(error);
         }else{
            res.redirect('/login');
         }
     });
    }else{
     console.log("No tienes autorizado registrar");
     res.redirect('/login');
    }
    }catch(error){
        console.log(error);
    }
 })

 app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/log', async(req, res)=>{
    conexion.query('SELECT * FROM estado', async(error, results)=>{
        if(results[0].dato=='0'){
            try{
                const user=req.body.user;
                const pass=req.body.pass;
                if(user&&pass){
                    conexion.query('SELECT * FROM registros WHERE usuario=?', [user], async(error, results)=>{
                        if(results.length<1 || results[0].password!=pass){
                            console.log("Usuario no encontrado")
                            console.log(results[0].password)
                            res.render('login', {
                                alert: true,
                                alertTitle: "Error",
                                alertMessage: "Usuario y/o contraseña incorrecta",
                                alertIcon: "error",
                                timer: 1500,
                                ruta: "login",
                                ip: ip   
                            });
                        }else{
                            req.session.loggedin = true;
                            req.session.name = results[0].usuario;
                            //sube dato de inicio de sesion
                           /* conexion.query('UPDATE estado set dato=?', [1], async(error, results)=>{
                                if(error){
                                    console.log(error);
                                }
                            });*/
                            res.redirect('/inicio');
                        }
                    })
                }                           
            } catch(error){
                console.log(error);
            }
        }else if(results[0].dato=='1'){
            res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Ya existe un usuario en uso",
                alertIcon: "error",
                timer: 1500,
                ruta: "error",
                ip: ip                 
            });
        }
        
    });
});
app.get('/error',(req,res)=>{
    res.render('error');
})

app.post('/err', async(req, res)=>{
    try{
        const clave=req.body.pass;
        if(clave=="559") {
            res.redirect('/logout')
        }else{
           console.log("clave erronea");
        res.redirect('/error');
        }
    }catch (error){
        console.log(error);
    }
})
//Método para controlar que está auth en todas las páginas

//función para limpiar la caché luego del logout

app.use(function(req, res, next) {
    try{
        if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
    }catch (error) {
        console.log(error);
    }
});

 //Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	try{
        req.session.destroy(() => {
	  res.redirect('/login') // siempre se ejecutará después de que se destruya la sesión
	});
    //sube dato de inicio de sesion a base de datos

    /*conexion.query('UPDATE estado set dato=?', [0], async(error, results)=> {
        if (error) {
            console.log(error);
        }
    });*/
    }catch (error) {
        console.log(error);
    }
});
app.get('/inicio',(req,res)=>{
    if(req.session.loggedin){
        cambios='Primer tiempo'
        cambios1='Segundo tiempo'
        cambios2='Tercer tiempo'
        cambios3='Cuarto tiempo'  
        tareaI=null
        tarea1=null
        tarea2=null
        tarea3=null
        tarea4=null
        esp1=null
        esp2=null
        esp3=null
        esp4=null
           const cam_1 = carpeta_camara1 + camara1

           fs2.readdir(cam_1)
               .then(files => {
                   const unlinkPromises = files.map(file => {
                       const filePath = path.join(cam_1, file)
                       return fs2.unlink(filePath)
                   })
                   return Promise.all(unlinkPromises)
               }).catch(err => {
               console.error(`Something wrong happened removing files of ${cam_1}`)
           });
           const cam_2 = carpeta_camara2 + camara2
           fs2.readdir(cam_2)
               .then(files => {
                   const unlinkPromises = files.map(file => {
                       const filePath = path.join(cam_2, file)
                       return fs2.unlink(filePath)
                   })
                   return Promise.all(unlinkPromises)
               }).catch(err => {
               console.error(`Something wrong happened removing files of ${cam_2}`)
           });
           const cam_3 = carpeta_camara3 + camara3
           fs2.readdir(cam_3)
               .then(files => {
                   const unlinkPromises = files.map(file => {
                       const filePath = path.join(cam_3, file)
                       return fs2.unlink(filePath)
                   })
                   return Promise.all(unlinkPromises)
               }).catch(err => {
               console.error(`Something wrong happened removing files of ${cam_3}`)
           });
           const cam_4 = carpeta_camara4 + camara4
           fs2.readdir(cam_4)
               .then(files => {
                   const unlinkPromises = files.map(file => {
                       const filePath = path.join(cam_4, file)
                       return fs2.unlink(filePath)
                   })
                   return Promise.all(unlinkPromises)
               }).catch(err => {
               console.error(`Something wrong happened removing files of ${cam_4}`)
           });     
           const cam_5 = carpeta_camara5 + camara5
           fs2.readdir(cam_5)
               .then(files => {
                   const unlinkPromises = files.map(file => {
                       const filePath = path.join(cam_5, file)
                       return fs2.unlink(filePath)
                   })
                   return Promise.all(unlinkPromises)
               }).catch(err => {
               console.error(`Something wrong happened removing files of ${cam_5}`)
           });       
       const FOLDER_TXT = 'C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/txt_camara'
       fs2.readdir(FOLDER_TXT)
           .then(files => {
               const unlinkPromises = files.map(file => {
                   const filePath = path.join(FOLDER_TXT, file)
                   return fs2.unlink(filePath)
               })
               return Promise.all(unlinkPromises)
           }).catch(err => {
           console.error(`Something wrong happened removing files of ${FOLDER_TXT}`)
       })
       const FOLDER_RFID = 'C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/txt_RFID'
       fs2.readdir(FOLDER_RFID)
           .then(files => {
               const unlinkPromises = files.map(file => {
                   const filePath = path.join(FOLDER_RFID, file)
                   return fs2.unlink(filePath)
               })
               return Promise.all(unlinkPromises)
           }).catch(err => {
           console.error(`Something wrong happened removing files of ${FOLDER_RFID}`)
       })
       const FOLDER_FOTO_E = 'C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/foto_entrega'
       fs2.readdir(FOLDER_FOTO_E)
           .then(files => {
               const unlinkPromises = files.map(file => {
                   const filePath = path.join(FOLDER_FOTO_E, file)
                   return fs2.unlink(filePath)
               })
               return Promise.all(unlinkPromises)
           }).catch(err => {
           console.error(`Something wrong happened removing files of ${FOLDER_FOTO_E}`)
       })
       const FOLDER_FOTO_R = 'C:/Users/IT Zitacuaro/Documents/C_IM_162023_SEC/public/foto_recepcion'
       fs2.readdir(FOLDER_FOTO_R)
           .then(files => {
               const unlinkPromises = files.map(file => {
                   const filePath = path.join(FOLDER_FOTO_R, file)
                   return fs2.unlink(filePath)
               })
               return Promise.all(unlinkPromises)
           }).catch(err => {
           console.error(`Something wrong happened removing files of ${FOLDER_FOTO_R}`)
       })
       io.on('connection', (socket)=>{
        socket.on("inicio", (msg)=>{
            tareaI = msg;
        });
        socket.on("t1", (msg)=>{
            esp1 = msg
        })
        socket.on("t2", (msg)=>{
            esp2 = msg
        })
        socket.on("t3", (msg)=>{
            esp3 = msg
        })
        socket.on("t4", (msg)=>{
            esp4 = msg
        })
        socket.on("punto1", (msg)=>{
            tarea1 = msg;
        });     
        socket.on("punto2", (msg)=>{
            tarea2 = msg;
        });  
        socket.on("punto3", (msg)=>{
            //console.log("punto3:", msg)
            tarea3 = msg;
        });  
        socket.on("punto4", (msg)=>{
            //console.log("punto4:", msg)
            tarea4 = msg;
        });  
        

   })
     res.render('index' , {login: true, 
        name: req.session.name,
        ip: ip
        });
    }else{
        res.render('index' , {login: true, 
            name: req.session.name,
            ip: ip
            });
    }
    
})
app.get("/pruebaPY", (req, res)=>{
    var tiempoP=10
    var pyP = new PythonShell('tiempo.py')
    console.log("inicia")
    pyP.send("hola"+","+tiempoP)
    pyP.on('message',function(message){
        console.log(message)
    })
})

app.get("/proceso", (req, res)=>{
    let marca=true
    var pyC=new PythonShell('camaras.py')
    client = mqtt.connect('ws://172.20.208.15:8083/mqtt')
    console.log("Tareas ",tareaI,tarea1, tarea2, tarea3, tarea4)
    let lista_rutas = [tareaI,tarea1, tarea2, tarea3, tarea4]
    let lista_tiempos=[esp1,esp2,esp3,esp4]
    // filtro para eliminar los ceros y null de la lista_rutas y tiempos
    lista_filtrada = lista_rutas.filter(element => element != 0 && element != null)
    lista_filtradaT =lista_tiempos.filter(element => element !=0&&element!=undefined)
    if(lista_filtrada.length-1==lista_filtradaT.length){
        console.log("Avanza a proceso")
    }else{
        marca=false
        msj="Cada punto necesita un tiempo de espera minimo de un segundo"
    }
    if(tarea1==null&&tarea2==null&&tarea3==null&&tarea4==null){
        msj="La ruta necesita destinos"
        marca=false
        console.log('falso')
    }else if(tareaI==null){
        marca=false
        msj="La ruta necesita un punto inicial"
    }
    for(var i=0; i<lista_filtrada.length-1;i++){
        if(lista_filtrada[i]==lista_filtrada[i+1]){   
            marca=false
            msj="No puedes poner la misma mesa consecutivamente"
        }else{                
            
        }
    }
    if(marca==true){
        pyC.send(lista_filtrada[0]+",4") // marca pausa
            pyC.on('message', function(message){
                nPieza=message
                
                              // tiempo a la espera
                    detectar(lista_filtrada[0])
                    let files1 = fs.readdirSync(dir)
                    console.log(dir)
                    let jpg1 = files1[0]
                    let img = encodeURIComponent(jpg1)
                    let img2  = decodeURIComponent(img)
                    imagen1 = cam + img2;
                    console.log(imagen1)
                    pyC.send('Salir')
                    pyC.end()
                    console.log(lista_filtrada[0])
                    client.publish('1/autonomo',lista_filtrada[0]+'R')
                    client.end()
                    res.redirect('/traslado') 
            })
          
            
        
       
    }else if(marca==false){
        
        res.render('index',{
            alert: true,
            alertTitle: "Error",
            alertMessage: msj,
            alertIcon: "error",
            ip: ip,
            login: true,
            ruta: "inicio", 
            name: req.session.name                           
        });
       
    }
})
app.get("/recarga",(req,res)=>{
    client.end()
    res.redirect("/inicio")
})
app.get("/traslado",(req,res)=>{
    if(req.session.loggedin){
        var pyC=new PythonShell('camaras.py')
        var pyM=new PythonShell('motores.py')
        var pyMA=new PythonShell('motoresA.py')
        var bandera = 0
        error=false
        inicio=new Date() 
        c=0
        client = mqtt.connect('ws://172.20.208.15:8083/mqtt')
        function conectar(){
          client.subscribe('1/autonomo_r') 
        }
        
      function mensaje(topic,message){
        console.log(message.toString())
        
        if(message=='Recibiendo'){
            pyM.send(lista_filtrada[0])
            pyM.on('message',function(message){
                client.publish('1/jetsonescaner',message)
                pyMA.send(lista_filtrada[0])
                pyMA.on('message',function(message){
                   pyMA.end()
                   pyM.end()
                })
                
        })
        
        }
        if(message=='Entregando'){
            if(error==true){
                client.publish('1/jetsonescaner','error')                                                                       //error
                pyM.send(lista_filtrada[0]+'R')
                pyM.on('message',function(message){
                    client.publish('1/jetsonescaner',message)
                    pyMA.send(lista_filtrada[0]+'R')
                    pyMA.on('message',function(message){
                        pyM.send('Salir')
                        pyM.end()
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                })
            }
            if(c==1&&error==false){
                pyC=new PythonShell('camaras.py')
                pyM=new PythonShell('motores.py')
                pyMA=new PythonShell('motoresA.py')
                //tiempo
                fin=new Date();
                diferencia=(fin-inicio) 
                cambios=tiempo(diferencia)
                //
                console.log(lista_filtrada[1])
                pyM.send(lista_filtrada[1]+'R')
    pyM.on('message',function(message){
            //manda mensaje motor de prendido
        client.publish('1/jetsonescaner',message)
        //primera llamada apaga motor
        pyM.send('Salir')
        pyM.end() 
        pyMA.send(lista_filtrada[1]+'R')
        pyMA.on('message', function(message){
            pyMA.send('Salir')
            pyMA.end() 
            console.log('apago el motor')       
            pyC.send(lista_filtrada[1]+","+esp1)
            console.log("inicia")                                                                //manda tiempo de espera
            pyC.on('message', function(message){
                console.log(message)                                         // se deberia esperar para iniciar esta funcion
                console.log("fin")
                    detectar(lista_filtrada[1])
                    let files1 = fs.readdirSync(dir)
                    let jpg1 = files1[0]
                    let img = encodeURIComponent(jpg1)
                    let img2  = decodeURIComponent(img)
                    imagen2 = cam + img2;
                    console.log(imagen2)
                    pyC.send('Salir')
                    pyC.end()
                    //----------------------------------
                    pyM=new PythonShell('motores.py')
                    pyMA=new PythonShell('motoresA.py')
                    if(message==nPieza){
                        console.log('salio bien la pick')
                        pyM.send(lista_filtrada[1]) 
                        pyM.on('message', function(message){
                            client.publish('1/jetsonescaner',message)
                            pyM.send('Salir')
                            pyM.end()
                            pyMA.send(lista_filtrada[1])
                            pyMA.on('message', function(message){
                                pyMA.send('Salir')
                                pyMA.end() 
                            })
                            
                        })
                    }else{
                        console.log('salio mal la pick')
                        error=true
                        pyM.send(lista_filtrada[1])
                        pyM.on('message', function(message){
                            client.publish('1/jetsonescaner',message)
                            pyM.send('Salir')
                            pyM.end()
                            pyMA.send(lista_filtrada[1])
                            pyMA.on('message',function(message){
                                pyMA.send('Salir')
                                pyMA.end()
                            })
                            
                        })
                    }
            //--------
                
                
                //<-
            
            })
        
        })  
    })

            }else if(c==2&&error==false){
                pyC=new PythonShell('camaras.py')
                pyM=new PythonShell('motores.py')
                pyMA=new PythonShell('motoresA.py')
                //tiempo
                fin=new Date();
            diferencia=(fin-inicio) 
            cambios1=tiempo(diferencia)
                
    pyM.send(lista_filtrada[2]+'R')
    pyM.on('message',function(message){
        client.publish('1/jetsonescaner',message)
        //primera llamada apaga motor
        pyM.send('Salir')
        pyM.end() 
        pyMA.send(lista_filtrada[2]+'R')
        pyMA.on('message', function(message){
            pyMA.send('Salir')
            pyMA.end() 
            console.log('apago el motor')       
            pyC.send(lista_filtrada[2]+","+esp2)         //tiempo de espera
            pyC.on('message', function(message){
                console.log(message)
                
                    detectar(lista_filtrada[2])
                    let files1 = fs.readdirSync(dir)
                    let jpg1 = files1[0]
                    let img = encodeURIComponent(jpg1)
                    let img2  = decodeURIComponent(img)
                    imagen3 = cam + img2;
                    console.log(imagen3)
                    pyC.send('Salir')
                    pyC.end()
                
                pyM=new PythonShell('motores.py')
                pyMA=new PythonShell('motoresA.py')
            if(message==nPieza){
                console.log('salio bien la pick')
                pyM.send(lista_filtrada[2]) 
                pyM.on('message', function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send(lista_filtrada[2])
                    pyMA.on('message',function(message){
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                    
                })
            }else{
                console.log('salio mal la pick')
                error=true
                pyM.send(lista_filtrada[2])
                pyM.on('message', function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send(lista_filtrada[2])
                    pyMA.on('message',function(message){
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                })
            }
            
            })
        
        })  
    })

            }else if(c==3&&error==false){
                pyC=new PythonShell('camaras.py')
                pyM=new PythonShell('motores.py')
                pyMA=new PythonShell('motoresA.py')
                //tiempo
                fin=new Date();
                diferencia=(fin-inicio) 
                cambios2=tiempo(diferencia)
                pyM.send(lista_filtrada[3]+'R')
                pyM.on('message',function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end() 
                    pyMA.send(lista_filtrada[3]+'R')
                    pyMA.on('message', function(message){
                        pyMA.send('Salir')
                        pyMA.end() 
                        console.log('apago el motor')       
                        pyC.send(lista_filtrada[3]+","+esp3)            //tiempo
                        pyC.on('message', function(message){
                            console.log(message)
                            
                                detectar(lista_filtrada[3])
                                let files1 = fs.readdirSync(dir)
                                let jpg1 = files1[0]
                                let img = encodeURIComponent(jpg1)
                                let img2  = decodeURIComponent(img)
                                imagen4 = cam + img2;
                                console.log(imagen4)
                                pyC.send('Salir')
                                pyC.end()
                            
                            pyM=new PythonShell('motores.py')
                            pyMA=new PythonShell('motoresA.py')
            if(message==nPieza){
                console.log('salio bien la pick')
                pyM.send(lista_filtrada[3]) 
                pyM.on('message', function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send(lista_filtrada[3])
                    pyMA.on('message',function(message){
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                })
            }else{
                console.log('salio mal la pick')
                error=true
                pyM.send(lista_filtrada[3])
                pyM.on('message', function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send(lista_filtrada[3])
                    pyMA.on('message',function(message){
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                })
            }
            
            })
        
        })  
    })

            }else if(c==4&&error==false){
                pyC=new PythonShell('camaras.py')
                pyM=new PythonShell('motores.py')
                pyMA=new PythonShell('motoresA.py')
                fin=new Date();
                diferencia=(fin-inicio) 
                cambios3=tiempo(diferencia)
               
                pyM.send(lista_filtrada[4]+'R')
                pyM.on('message',function(message){
                client.publish('1/jetsonescaner',message)
        
                pyM.send('Salir')
                pyM.end() 
                pyMA.send(lista_filtrada[4]+'R')
                pyMA.on('message', function(message){
                pyMA.send('Salir')
                pyMA.end() 
                console.log('apago el motor')       
                pyC.send(lista_filtrada[4]+","+esp4)            //tiempo
            pyC.on('message', function(message){
                console.log(message)
                
                    detectar(lista_filtrada[4])
                    let files1 = fs.readdirSync(dir)
                    let jpg1 = files1[0]
                    let img = encodeURIComponent(jpg1)
                    let img2  = decodeURIComponent(img)
                    imagen5 = cam + img2;
                    console.log(imagen5)
                    pyC.send('Salir')
                    pyC.end()
                
                pyM=new PythonShell('motores.py')
                pyMA=new PythonShell('motoresA.py')
            if(message==nPieza){
                console.log('salio bien la pick')
                pyM.send(lista_filtrada[4]) 
                pyM.on('message', function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send(lista_filtrada[4])
                    pyMA.on('message',function(message){
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                })
            }else{
                console.log('salio mal la pick')
                error=true
                pyM.send(lista_filtrada[4])
                pyM.on('message', function(message){
                    client.publish('1/jetsonescaner',message)
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send(lista_filtrada[4])
                    pyMA.on('message',function(message){
                        pyMA.send('Salir')
                        pyMA.end()
                    })
                })
            }
            
            })
        
        })  
    })

            }
        }
        
        if(message=='listo'){
                if(bandera==1){
                    boton='1'
                    bandera = 0
                    client.end()
                    pyM.send('Salir')
                    pyM.end()
                    pyMA.send('Salir')
                    pyMA.end()
                    error = false
                }
            if(c==lista_filtrada.length||error==true){
                if(error==true){
                    client.publish('1/autonomo',lista_filtrada[0]+'E')
                    bandera = 1
                }else if(error==false){
                    fin=new Date();
                    diferencia=(fin-inicio) 
                    cambios3=tiempo(diferencia)
                    boton='1'
                    bandera = 0
                    client.end()
                }
                
                
            }else{
                if(c==0){
                    client.publish('1/autonomo',lista_filtrada[1]+'E')
                if(lista_filtrada.length>0){
                    c=1 
             
                }    
            }else if(c==1){
                client.publish('1/autonomo',lista_filtrada[2]+'E')
                if(lista_filtrada.length>1){
                c=2  
                 
                }
                inicio=new Date()
            }else if(c==2){
                client.publish('1/autonomo',lista_filtrada[3]+'E')
                if(lista_filtrada.length>2){
                    c=3
                     
                }
                inicio=new Date()
            }else if(c==3){
                client.publish('1/autonomo',lista_filtrada[4]+'E')
                if(lista_filtrada.length>3){
                    c=4
                     
                } 
                inicio=new Date()
            }  
            }          
            }  
        }
        var tam=lista_filtrada.length
    client.on('connect', conectar)
    client.on('message',mensaje)

    res.render('resultados',{ip: ip,login: true,name: req.session.name,objetos:lista_filtrada,tamaño:tam,img:imagen1,t1:cambios,t2:cambios1,t3:cambios2,t4:cambios3,f2:imagen2,f3:imagen3,f4:imagen4,f5:imagen5})  
    }
    
})
app.get('/recibir',(req,res)=>{
    
    var tam=lista_filtrada.length
    res.render('tiempos',{t1:cambios,t2:cambios1,t3:cambios2,t4:cambios3,objetos:lista_filtrada,tamaño:tam})
})
app.get('/fotos',(req,res)=>{
    var tam=lista_filtrada.length
    
    res.render('fotoC',{img:imagen1,f2:imagen2,f3:imagen3,f4:imagen4,f5:imagen5,objetos:lista_filtrada,tamaño:tam})
})
server.listen(port, hostname, () => {
    console.log('server runing at', hostname)
});