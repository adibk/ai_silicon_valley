import requests
from tqdm import tqdm

# Load your DataFrame with latitude and longitude columns
# For example:
# df = pd.read_csv('your_data.csv')

# Function to geocode coordinates in batches using OpenCage API
def geocode_batch(coordinates, api_key='28cd0beba3a04ce29fc0b4c976b549a3', batch_size=100):
    cities = []
    for i in tqdm(range(0, len(coordinates), batch_size)):
        batch_coords = coordinates[i:i+batch_size]
        coords_str = '|'.join([f"{lat},{lon}" for lat, lon in batch_coords])
        url = f'https://api.opencagedata.com/geocode/v1/json?key={api_key}&q={coords_str}&pretty=1'
        response = requests.get(url)
        
        print(response)
        data = response.json()
        if data.get('results'):
            for result in data['results']:
                city = result['components'].get('city', '')
                cities.append(city)
        else:
            cities.extend([''] * len(batch_coords))
    return cities



# coordinates = list(zip(df['latitude'], df['longitude']))
# cities = geocode_batch(coordinates, api_key)

# df['city'] = cities

# coordinates = [(-119, 36)]
# city = geocode_batch(coordinates)
# print(city)