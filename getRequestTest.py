import requests

print requests.post('http://localhost:3000/signUp',data={"username":"rayray","password":"hi","userType":"applicant"}).text
