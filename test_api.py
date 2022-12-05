import requests

BASE= "http://127.0.0.1:5000/"

data = [{"likes": 10, "name":"ando's funny video", "views" : 121},
        {"likes": 1420, "name":"how to make paper planes", "views" : 42000},
        {"likes": 23099, "name":"awesome flip", "views" : 929299}]

for i in range(len(data)):
    request_str=BASE + "videos/"+str(i)
    response = requests.post(request_str, data[i])
    print(request_str)
    print(response.json())

raw_input()
request_str=BASE + "videos/2"
print(request_str)
response = requests.get(request_str)
print(response)
print(response.json())
raw_input()
response = requests.put(request_str, {"views": 130})
print(response.json())
raw_input()
response = requests.delete(request_str)
print(response.json())
raw_input()
response = requests.post(request_str, data[2])
print(response.json())