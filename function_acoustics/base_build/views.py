from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def main(request):

    frequence = request.GET.get('sliderValue1', '0')
    amplitude = request.GET.get('sliderValue2', '0')
    duration = request.GET.get('sliderValue3', '0')
    # print(f"Slider values -> slider1: {frequence}, slider2: {amplitude}, slider3: {duration}")
    context = {'slider1': frequence, 'slider2': amplitude, 'slider3': duration}
    template = loader.get_template('mainPage.html')
    return HttpResponse(template.render(context, request))


