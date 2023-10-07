import requests

def fnDetail(mlsvId):
    # Define the URL and data to send in the POST request
    url = 'https://yangcheon.sen.hs.kr/dggb/module/mlsv/selectMlsvDetailPopup.do'
    data = {'mlsvId': mlsvId}

    # Define the User-Agent header for the latest stable version of Chrome
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
        # Add any other headers you need here
    }

    try:
        # Send a POST request with the defined headers
        response = requests.post(url, data=data, headers=headers)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Assuming you want to print the response content
            print(response.text)
        else:
            print(f"Request failed with status code {response.status_code}")

    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
mlsv_id = 2376918  # Replace with your desired mlsvId
fnDetail(mlsv_id)
