import requests
import time

def motor1E():
    url = 'http://172.20.228.201'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[1]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagado')
def motor1R():
    url = 'http://172.20.228.201'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[2]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagado')
def motor2E():
    url = 'http://172.20.228.207'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor2R():
    url = 'http://172.20.228.207'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor3E():
    url = 'http://172.20.208.234'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor3R():
    url = 'http://172.20.208.234'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor4R():
    url = 'http://172.20.208.237'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor4E():
    url = 'http://172.20.208.237'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor5R():
    url = 'http://172.20.208.240'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[3]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
def motor5E():
    url = 'http://172.20.208.240'
    time.sleep(7)
    apagar = "00"
    datos2 = {"code": "request", "cid": 4, "adr": "/iolinkmaster/port[4]/iolinkdevice/pdout/setdata", "data": {"newvalue": apagar}}
    respuesta = requests.post(url, json = datos2)
    Rjson2 = respuesta.json()
    print('apagar')
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