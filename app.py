from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS
import numpy as np
import librosa
import json
from flask_cors import CORS  # Import CORS here

app = Flask(__name__)
CORS(app)

# Load the audio model
with open('model.json', 'r') as json_file:
    loaded_model_json_2 = json_file.read()
audio_model = tf.keras.models.model_from_json(loaded_model_json_2)
audio_model.load_weights("model_weights.h5")

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


if __name__ == '__main__':
    app.run(host='0.0.0.0' ,debug=True)
