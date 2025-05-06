import requests
import time


def motor1E():
    prender = "01"
    url = 'http://172.20.228.201'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[1]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor1R():
    prender = "01"
    url = 'http://172.20.228.201'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[2]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor2E():
    prender = "01"
    url = 'http://172.20.228.207'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor2R():
    prender = "01"
    url = 'http://172.20.228.207'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor3E():
    prender = "01"
    url = 'http://172.20.208.234'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor3R():
    prender = "01"
    url = 'http://172.20.208.234'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor4R():
    prender = "01"
    url = 'http://172.20.208.237'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor4E():
    prender = "01"
    url = 'http://172.20.208.237'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor5R():
    prender = "01"
    url = 'http://172.20.208.240'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")
def motor5E():
    prender = "01"
    url = 'http://172.20.208.240'
    datos1 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": prender}}
    respuesta = requests.post(url, json = datos1)
    Rjson1 = respuesta.json()
    print ("Prendido")

while True:
    mensaje = input("")
    
    if mensaje == "Mesa 1":
        motor1E()
    elif mensaje == "Mesa 1R":
        motor1R()
    elif mensaje == "Mesa 2":
        motor2R()
    elif mensaje == "Mesa 2R":
        motor2E()
    elif mensaje == "Mesa 3":
        motor3R()
    elif mensaje == "Mesa 3R":
        motor3E()
    elif mensaje == "Mesa 4":
        motor4R()
    elif mensaje == "Mesa 4R":
        motor4E()
    elif mensaje == "Mesa 5":
        motor5R()
    elif mensaje == "Mesa 5R":
        motor5E()
    elif mensaje == "Salir":
        break
