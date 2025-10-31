from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import numpy as np, matplotlib.pyplot as plt, scipy.io.wavfile as wavf, scipy.signal as sig, sounddevice
def main(request):

    func = request.GET.get('func')
    chose_function = lambda x : "1. Sin" if x is None  else x
    function_str = chose_function(func)
    extracted_function = function_str.split(' ')[1].lower()

    frequence = request.GET.get('sliderValue1', '0')
    amplitude = request.GET.get('sliderValue2', '0')
    duration = request.GET.get('sliderValue3', '0')
    phase_multiplier = request.GET.get('sliderValue4', '0')
    sampling_frequency= request.GET.get('sliderValue5', '0')
    print(f"Function: {extracted_function}\nParameter values -> frequency: {frequence}, amplitude: {amplitude}, duration: {duration}, phase multiplier: {duration}, sampling frequency: {sampling_frequency}")
    phase  = float(phase_multiplier) * np.pi
    context = {'func': func, 'slider1': frequence, 'slider2': amplitude, 'slider3': duration, 'slider4': phase_multiplier, 'slider5': sampling_frequency}
    template = loader.get_template('mainPage.html')
    return HttpResponse(template.render(context, request))


