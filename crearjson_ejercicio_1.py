import random
import json 
import string
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests

# app=Flask(__name__)
# CORS(app)


def generacion_mail():
    usuariol = random.randint(5,12) 
    usuario = ''.join(random.choices(string.ascii_lowercase + string.digits, k=usuariol))
    correos = random.choice(['gmail.com','yahoo.com','hotmail.com'])

    return f"{usuario}@{correos}"

def generacion_nombres():
    nombrel = random.randint(5,12) 
    nombre = ''.join(random.choices(string.ascii_lowercase + string.digits, k=nombrel))

    return nombre

def generacion_password():
    clavel = random.randint(5,12) 
    clave = ''.join(random.choices(string.ascii_lowercase + string.digits, k=clavel))

    return clave

def generacion_json():
    return {
        "email": generacion_mail(),
        "nombre": generacion_nombres(),
        "password": generacion_password()
    }

registros = [generacion_json() for _ in range (500000)]

with open ('registros.json','w') as archivo_json:
    json.dump(registros, archivo_json, indent=2)


# @app.route('/generar_json',methods=['GET'])
# def index():
#     registros
#     response =jsonlfy(registros)
#     return response
    

