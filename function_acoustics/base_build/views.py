from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import numpy as np

def main(request):

    frequence = request.GET.get('sliderValue1', '0')
    amplitude = request.GET.get('sliderValue2', '0')
    duration = request.GET.get('sliderValue3', '0')
    phase_multiplier = request.GET.get('sliderValue4', '0')
    # print(f"Slider values -> slider1: {frequence}, slider2: {amplitude}, slider3: {duration}, slider3: {duration}")
    phase  = float(phase_multiplier) * np.pi
    context = {'slider1': frequence, 'slider2': amplitude, 'slider3': duration, 'slider4' : phase_multiplier}
    template = loader.get_template('mainPage.html')
    return HttpResponse(template.render(context, request))


