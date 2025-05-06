import sys
import socket
import time

def camara1E():
    tcp_client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_client_socket.connect(("172.20.228.204", 50010))
    tcp_client_socket.send(
        "1234L000000008\r\n1234T?\r\n".encode())  # para mandar la orden de tomar la foto en la camara
    time.sleep(0.5)
    tcp_client_socket.send(
        "1234L000000008\r\n1234R?\r\n".encode())  # para mandar la orden de obtener los resultados de la ultima accion de la camara
    time.sleep(0.3)
    udp_data = tcp_client_socket.recv(1024)
    a = udp_data.decode()
    b = a[30:34]  # accedemos a la parte de la lista en donde se encuentra el dato del nùmero de pieza encontrada
    print(b)


def camara2():
    tcp_client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_client_socket.connect(("172.20.228.203", 50010))
    tcp_client_socket.send(
        "1234L000000008\r\n1234T?\r\n".encode())  # para mandar la orden de tomar la foto en la camara
    time.sleep(0.5)
    tcp_client_socket.send(
        "1234L000000008\r\n1234R?\r\n".encode())  # para mandar la orden de obtener los resultados de la ultima accion de la camara
    time.sleep(0.3)
    udp_data = tcp_client_socket.recv(1024)
    a = udp_data.decode()
    b = a[30:34]  # accedemos a la parte de la lista en donde se encuentra el dato del nùmero de pieza encontrada
    print(b)

def camara3():
    tcp_client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_client_socket.connect(("172.20.208.235", 50010))
    tcp_client_socket.send(
        "1234L000000008\r\n1234T?\r\n".encode())  # para mandar la orden de tomar la foto en la camara
    time.sleep(0.5)
    tcp_client_socket.send(
        "1234L000000008\r\n1234R?\r\n".encode())  # para mandar la orden de obtener los resultados de la ultima accion de la camara
    time.sleep(0.3)
    udp_data = tcp_client_socket.recv(1024)
    a = udp_data.decode()
    b = a[30:34]  # accedemos a la parte de la lista en donde se encuentra el dato del nùmero de pieza encontrada
    print(b)

def camara4():
    tcp_client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_client_socket.connect(("172.20.208.238", 50010))
    tcp_client_socket.send(
        "1234L000000008\r\n1234T?\r\n".encode())  # para mandar la orden de tomar la foto en la camara
    time.sleep(0.5)
    tcp_client_socket.send(
        "1234L000000008\r\n1234R?\r\n".encode())  # para mandar la orden de obtener los resultados de la ultima accion de la camara
    time.sleep(0.3)
    udp_data = tcp_client_socket.recv(1024)
    a = udp_data.decode()
    b = a[30:34]  # accedemos a la parte de la lista en donde se encuentra el dato del nùmero de pieza encontrada
    print(b)  

def camara5():
    tcp_client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_client_socket.connect(("172.20.208.241", 50010))
    tcp_client_socket.send(
        "1234L000000008\r\n1234T?\r\n".encode())  # para mandar la orden de tomar la foto en la camara
    time.sleep(0.5)
    tcp_client_socket.send(
        "1234L000000008\r\n1234R?\r\n".encode())  # para mandar la orden de obtener los resultados de la ultima accion de la camara
    time.sleep(0.3)
    udp_data = tcp_client_socket.recv(1024)
    a = udp_data.decode()
    b = a[30:34]  # accedemos a la parte de la lista en donde se encuentra el dato del nùmero de pieza encontrada
    print(b) 
while True:

    mensaje = input("")
    x= mensaje.split(",")
    
    if x[0] == "Mesa 1":
        time.sleep(int(x[1]))
        camara1E()
    elif x[0] == "Mesa 2":
        time.sleep(int(x[1]))
        camara2()
    elif x[0] == "Mesa 3":
        time.sleep(int(x[1]))
        camara3()
    elif x[0] == "Mesa 4":
        time.sleep(int(x[1]))
        camara4()
    elif x[0] == "Mesa 5":
        time.sleep(int(x[1]))
        camara5()
    elif mensaje == "Salir":
        break