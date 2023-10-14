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
    action = request.POST['action']
    print(action)