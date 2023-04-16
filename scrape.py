import requests, json
from bs4 import BeautifulSoup

url = 'https://temp-f5l.pages.dev/index.html'

# send a GET request to the URL
response = requests.get(url)

# parse the response content into the BeautifulSoup object
soup = BeautifulSoup(response.content, 'html.parser')

# find the table with the ID 'ctl00_BodyContent_ctl00_PriceGrid'
table = soup.find('table', {'id': 'ctl00_BodyContent_ctl00_PriceGrid'})

# convert all tr elements in the table to arrays
rows = []
for tr in table.find_all('tr'):
    row = [td.text.strip() for td in tr.find_all('td')]
    if len(row) > 0:
        rows.append(row)


result_array = {}

for row in rows:
    if row[1]  not in result_array:
        result_array[row[1]] = {"sizes": []}
    
    result_array[row[1]]["sizes"].append( {
        "size_name":row[2],
        "price":row[3]
    })


file = open("price_list.json","w")
file.write(json.dumps(result_array))