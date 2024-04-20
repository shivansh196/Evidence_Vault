from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from flask_cors import CORS
import numpy as np
import librosa
import json
from flask_cors import CORS  # Import CORS here

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': ['http://localhost:3000']}})

# Load the audio model
with open('model.json', 'r') as json_file:
    loaded_model_json_2 = json_file.read()
audio_model = tf.keras.models.model_from_json(loaded_model_json_2)
audio_model.load_weights("model_weights.h5")

# Load the photo model
with open("model_photo.json", "r") as json_file:
    loaded_model_json_1 = json_file.read()
photo_model = tf.keras.models.model_from_json(loaded_model_json_1)
photo_model.load_weights('model_photo_weights.h5')

# Define a route for making predictions
@app.route('/predict_audio', methods=['GET', 'POST'])
def predict_audio():
     file = request.files['file']
     if file:
        sound_signal, sample_rate = librosa.load(file, sr=None, res_type="kaiser_fast")  # Add sr=None
        mfcc_features = librosa.feature.mfcc(y=sound_signal, sr=sample_rate, n_mfcc=40)
        mfccs_features_scaled = np.mean(mfcc_features.T, axis=0)
        mfccs_features_scaled = mfccs_features_scaled.reshape(1, -1)
        result_array = audio_model.predict(mfccs_features_scaled)
        print(result_array)
        result_classes = ["REAL", "FAKE"]
        result = np.argmax(result_array[0])
        print("Result:", result_classes[result])
        return jsonify({'predictions':  result_classes[result]})
     else:
        return "Invalid file"
     
@app.route('/predict_photo', methods=['GET', 'POST'])
def predict_photo():
     print("File received:", file.filename)
     file = request.files['image']
     print("File received:", file.filename)
     if file:
        # Load and preprocess the image
        file_path = 'temp_image.jpg'
        file.save(file_path)
        print("File saved to:", file_path)
        img = image.load_img(file_path, target_size=(32, 32))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        print("Image loaded and preprocessed")

        # Make prediction
        prediction = photo_model.predict(img_array)
        print("Prediction:", prediction) 

        # Assuming the model output is binary (0 or 1)
        # Convert prediction to class label
        class_label = "FAKE" if prediction < 0.5 else "REAL"

        # Return the prediction as JSON
        return jsonify({'predictions': class_label})
     else:
        return "Invalid file"


if __name__ == '__main__':
    app.run(debug=True)
