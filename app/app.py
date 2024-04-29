from flask import Flask, request, render_template
import pandas as pd
import joblib
import os

app = Flask(__name__)
model_path = "model"


# print("Current working directory:", os.getcwd())

model = joblib.load(f'{model_path}/knn_pipe.joblib')

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html') 

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "No file part"
    file = request.files['file']
    if file.filename == '':
        return "No selected file"
    if file:
        df = pd.read_csv(file)
        predictions = model.predict(df)
        return str(predictions)

@app.route('/predict_manual', methods=['POST'])
def predict_manual():
    try:
        # Collect all form data
        data = {
            'longitude': float(request.form['longitude']),
            'latitude': float(request.form['latitude']),
            'housing_median_age': float(request.form['housing_median_age']),
            'total_rooms': float(request.form['total_rooms']),
            'total_bedrooms': float(request.form['total_bedrooms']),
            'population': float(request.form['population']),
            'households': float(request.form['households']),
            'median_income': float(request.form['median_income']),
            'ocean_proximity': request.form['ocean_proximity']
        }
        
        # Convert the form data into a DataFrame
        df = pd.DataFrame([data])
        # Predict using the loaded model
        predictions = model.predict(df)
        return f"Predicted House Value: {predictions[0]}"
    except Exception as e:
        return f"Error processing input data: {str(e)}"

    
if __name__ == '__main__':
    app.run(debug=True)

