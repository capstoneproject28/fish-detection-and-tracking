from django.shortcuts import render

def index(request, *args, **kawrgs):
    return render(request, 'frontend/index.html')
    