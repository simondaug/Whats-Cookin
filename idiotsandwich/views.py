from django.http import HttpResponse
from django.shortcuts import render

def hello(request):
    return render(
        request,
        "html/test.html",
        {
            "name": "bar",
        },
    )

def loginPage(request):
    return render(
        request,
        "html/login.html",
        {
            "name": "bar",
        },
    )

def login(request):
    print(request.POST['username'])
    action = request.POST['username']
    print(action)
    return hello(request)