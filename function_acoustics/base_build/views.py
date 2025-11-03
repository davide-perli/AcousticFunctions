from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json, numpy as np, scipy.signal as sig
def main(request):

    func = request.GET.get('func')
    function_str = func if func and func.strip() else "1. Sin"
    title = f"{function_str.split(' ')[-1]} signal"
    extracted_function = function_str.split(' ')[-1].lower() 

    frequence = float(request.GET.get('sliderValue1', '0'))
    amplitude = float(request.GET.get('sliderValue2', '0'))
    duration = float(request.GET.get('sliderValue3', '0'))
    phase_coeficient = float(request.GET.get('sliderValue4', '0'))
    sampling_frequency= float(request.GET.get('sliderValue5', '0'))
    print(f"Function: {extracted_function}\nParameter values -> frequency: {frequence}, amplitude: {amplitude}, duration: {duration}, phase coeficient: {phase_coeficient}, sampling frequency: {sampling_frequency}")
    phase  = phase_coeficient * np.pi
    t = np.linspace(0, duration, int(duration * sampling_frequency))
    f = 2 * np.pi * frequence * t + phase
    if extracted_function == "sin":
        semnal = np.sin(f)
    elif extracted_function == "cos":
        semnal = np.cos(f)
    elif extracted_function == "tan":
        if f.size == 0:
            semnal = np.sin(0)
        else:
            semnal = np.tan(f)
    elif extracted_function == "cotan":
        if f.size == 0:
            semnal = np.sin(0)
        else:
            semnal = 1 / np.tan(f)
    elif extracted_function == "sawtooth":
        semnal = sig.sawtooth(f)
    elif extracted_function == "square":
        semnal = sig.square(f)

    data_to_send = {'x': t.tolist(), 'y': semnal.tolist(), 'title': title, 'samplingFrequency': sampling_frequency}
    
    context = {'func': func, 'slider1': frequence, 'slider2': amplitude, 'slider3': duration, 'slider4': phase_coeficient, 'slider5': sampling_frequency, 'plot_data_json': json.dumps(data_to_send)}
    template = loader.get_template('mainPage.html')
    return HttpResponse(template.render(context, request))

