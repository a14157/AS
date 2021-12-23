#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import seaborn as sns
import os
from PIL import Image, ImageOps
from sklearn.model_selection import train_test_split
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Activation, Dropout, Flatten, Dense
from keras import optimizers
from keras.preprocessing.image import ImageDataGenerator
import tensorflow as tf
from flask import Flask, request, redirect, url_for, flash, jsonify
from flasgger import Swagger


# In[2]:


agemodel = keras.models.load_model("idade_modelo.h5")


# In[3]:


genmodel = keras.models.load_model("genero_modelo.h5")


# In[4]:


def process_and_predict(file):
    im = Image.open(file)
    width, height = im.size
    if width == height:
        im = im.resize((200,200), Image.ANTIALIAS)
    else:
        if width > height:
            left = width/2 - height/2
            right = width/2 + height/2
            top = 0
            bottom = height
            im = im.crop((left,top,right,bottom))
            im = im.resize((200,200), Image.ANTIALIAS)
        else:
            left = 0
            right = width
            top = 0
            bottom = width
            im = im.crop((left,top,right,bottom))
            im = im.resize((200,200), Image.ANTIALIAS)
            
    ar = np.asarray(im)
    ar = ar.astype('float32')
    ar /= 255.0
    ar = ar.reshape(-1, 200, 200, 3)
    
    age = agemodel.predict(ar)
    gender = np.round(genmodel.predict(ar))
    if gender == 0:
        gender = 'Masculino'
    elif gender == 1:
        gender = 'Feminino'
        
    #print('Idade:', int(age), '\n Genero:', gender)
    results = []
    results.append(int(age))
    results.append(gender)
    #return im.resize((300,300), Image.ANTIALIAS)
    return results


# In[5]:


UPLOAD_FOLDER = 'dev/'
ALLOWED_EXTENSIONS = set(['tif', 'png', 'jpg', 'jpeg', 'gif','undefined'])
API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJyZW50QVBJIjoicHl0aG9uQVBJc2VjcmV0In0.x4RjeHvUH572nLVp07_2YxGeUhX4v9ThemWpdcsb-10'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

#(criar o servidor) flask
app = Flask(__name__)
#http://localhost:9000/apidocs
swagger = Swagger(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['API_KEY'] = API_KEY


# In[6]:


@app.route('/api/predict', methods=['POST'])
def m_upload():
    """Example endpoint returning a prediction for cats and dogs
    ---
    consumes:
      - multipart/form-data  
    parameters:
      - in: formData
        name: image
        required: true
        description: Upload your file.
        type: file
    definitions:
      Image:
        type: file
    responses:
      200:
        description: A prediction for the image (Dog, Cat)
        schema:
          $ref: '#/definitions/Image'
        examples:
          image: "teste.jpg"
    """
    # check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({'error':'No posted image. Should be attribute named image.'})
    file = request.files['image']
    
    headers = request.headers
    key='Python-Api-Token'
    if key in headers.keys():
        print("Key exists")    
    else:
        return jsonify({'Error':'API token required.'})
    
    if headers['Python-Api-Token'] != app.config['API_KEY']:
        return jsonify({'Error':'API token required.'})

    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        return jsonify({'error':'Empty filename submitted.'})
    if file and allowed_file(file.filename):
        filename = file.filename
        print("ficheiro:"+filename)
        print(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        print(filename)
        result = process_and_predict(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print(result)
        response = {'age':result[0], 'gender': result[1]}
        return jsonify(response)
    else:
        return jsonify({'error':'File has invalid extension'})


# In[7]:


if __name__ == '__main__':
    app.run(host= '0.0.0.0',port=9000)


# In[ ]:




