# 🎵 Custom Function Acoustics

**Crea, visualizza e ascolta segnali matematici personalizzati in tempo reale.**
Un'app web interattiva basata su Django che combina **elaborazione dei segnali in Python (NumPy, SciPy)** con visualizzazioni frontend **Plotly.js** - tutto in un'interfaccia responsiva con **modalità chiaro/scuro**.

---

## 📑 Indice

1. [Panoramica](#-panoramica)
2. [Fondamenti matematici](#-fondamenti-matematici)
3. [Funzionalità](#-funzionalità)
4. [Stack tecnologico](#-stack-tecnologico)
5. [Aspetti frontend](#-aspetti-frontend)
6. [Panoramica backend](#-panoramica-backend)
7. [Struttura del progetto](#-struttura-del-progetto)
8. [Installazione e configurazione](#-installazione-e-configurazione)
9. [Come eseguire](#-come-eseguire)
10. [Screenshot](#-screenshot)
11. [Anteprima animata](#-anteprima-animata)
12. [Licenza](#-licenza)

---

## 🧭 Panoramica

Questa applicazione web permette agli utenti di creare ed esplorare **segnali periodici personalizzati** in modo interattivo.

Puoi:

* Scegliere un tipo di segnale (`sin`, `cos`, `tan`, `cotan`, `sawtooth`, `square`)
* Regolare parametri come **frequenza**, **ampiezza**, **durata**, **fase** e **frequenza di campionamento**(**quando si selezionano valori elevati per la frequenza e la frequenza di campionamento, attendere che la pagina si ricarichi poiché ci vuole tempo per calcolare**)
* Visualizza il grafico (passandoci sopra il mouse è possibile ingrandire, selezionare un pezzo, scaricarlo ecc.)
* Osservare grafici dinamici del segnale con Plotly
* Riprodurre il segnale generato in tempo reale

Serve sia come **strumento didattico** per l'analisi dei segnali sia come **sandbox visivo** per esplorare il comportamento delle forme d'onda.

---

## 📐 Fondamenti matematici

Alla base, il segnale generato si costruisce dall'equazione della frequenza angolare:

$$
f(t) = 2\pi \cdot \text{frequency} \cdot t + \phi
$$

dove:

* $t$ - tempo (secondi)
* $\phi = \text{coefficiente di fase} \cdot \pi$ - sfasamento in radianti sull'asse X
* $\text{frequency}$ - numero di oscillazioni al secondo
* $\text{amplitude}$ - ampiezza del segnale sull'asse Y

Il segnale di uscita $s(t)$ dipende dalla funzione selezionata:

$$
s(t) =
\begin{cases}
amplitude * \sin(f(t)), & \text{Onda sinusoidale} \\
amplitude * \cos(f(t)), & \text{Onda coseno} \\
amplitude * \tan(f(t)), & \text{Onda tangente} \\
amplitude * \cot(f(t)) = \frac{1}{\tan(f(t))}, & \text{Onda cotangente} \\
amplitude * \text{sawtooth}(f(t)), & \text{Onda sawtooth} \\
amplitude * \text{square}(f(t)), & \text{Onda quadrata}
\end{cases}
$$

Questi segnali sono calcolati usando **NumPy** e **SciPy**, quindi serializzati in JSON per la visualizzazione interattiva nel frontend.

---

## ⚙️ Funzionalità

✅ **Generazione dei segnali in tempo reale**
✅ **Slider interattivi per i parametri**
✅ **Grafici dinamici con Plotly.js**
✅ **Riproduzione audio istantanea tramite Web Audio API**
✅ **Modalità chiaro/scuro persistente** con `localStorage`
✅ **Calcolo veloce nel backend usando NumPy & SciPy**

---

## 🧩 Stack tecnologico

| Livello             | Tecnologia                                         |
| :------------------ | :------------------------------------------------- |
| **Frontend**        | HTML5, CSS3, JavaScript (Plotly.js, Web Audio API) |
| **Backend**         | Django, Python (NumPy, SciPy)                      |
| **Comunicazione**   | JSON tra view Django e template                    |
| **Visualizzazione** | Grafici dinamici Plotly.js                         |
| **Stilizzazione**   | CSS con toggle modalità chiaro/scuro               |

---

## 💡 Aspetti frontend

* **Grafici Plotly.js:**
  Grafici interattivi, ridimensionabili e responsive che si aggiornano in tempo reale.

* **Modalità chiaro/scuro:**
  Implementata con transizione fluida e memoria in local storage.
  Risolve problemi comuni di flickering e interazione con i campi di input.

* **Riproduzione segnale:**
  Usa Web Audio API per generare il suono direttamente dai dati dell'onda.

---

## 🧠 Panoramica backend

La view Django calcola il segnale così:

```python
phase = phase_coefficient * np.pi
t = np.linspace(0, duration, int(duration * sampling_frequency))
f = 2 * np.pi * frequency * t + phase
```

Poi, a seconda della funzione scelta:

```python
if func == "sin":
    segnale = amplitude * np.sin(f)
elif func == "cos":
    segnale = amplitude * np.cos(f)
elif func == "sawtooth":
    segnale = amplitude * sig.sawtooth(f)
elif func == "square":
    segnale = amplitude * sig.square(f)
```

L'output viene passato al template come JSON per il rendering nel frontend:

```python
data_to_send = {'x': t.tolist(), 'y': segnale.tolist(), 'title': title}
```

---

## 📁 Struttura del progetto

```
custom-function-acoustics/
├── manage.py
├── requirements.txt
├── backend/                         # Logica applicazione Django
│   ├── views.py                     # Generazione segnale e logica risposta
│   ├── urls.py                      # Routing URL
│   ├── models.py                    
│   ├── templates/
│   │   └── mainPage.html            # Template principale con logica frontend
│   └── static/
│       ├── js/
│       │   ├── plot_generation.js   # Grafici Plotly, audio, animazione
│       │   ├── fomrInput.js         # Elaborazione input utente
│       │   └── lightMode.js         # Funzionalità modalità chiaro/scuro
│       └── css/
│          └── mainPage.css          # Stile UI
├── docs/
│   └── screenshots/                 # Screenshot e GIF
│       ├── light_mode.png
│       ├── dark_mode.png
│       └── animated_preview.gif
├── Dockerfile                       # Per correre all'interno di un contenitore
├── docker-compose.yml               # Per correre all'interno di un contenitore
└── README.md
```

---

## 🧰 Installazione e configurazione

### 1️⃣ Clonare il repository

```bash
git clone https://github.com/yourusername/custom-function-acoustics.git
cd custom-function-acoustics
```

### 2️⃣ Creare e attivare l'ambiente virtuale

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3️⃣ Installare le dipendenze

**Dal file:**

```bash
pip install -r requirements.txt
```

**Manuale:**

```bash
pip install django numpy scipy
```

---

## 🚀 Come eseguire

```bash
cd function_acoustics
python manage.py runserver
```

### Se preferisci eseguire il progetto in un contenitore Docker (non è richiesta alcuna configurazione Python locale)

🐳 Esegui con Docker

```bash
docker compose up --build
```

Poi apri il browser e visita:
👉 [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

Ora puoi:

* Selezionare una forma d'onda (Sin, Cos, Tan, Cotan, Sawtooth, Square)
* Regolare parametri come frequenza, ampiezza, durata, ecc.
* Osservare il cambiamento del segnale istantaneamente sul grafico
* Riprodurre il segnale
* Cambiare tra modalità chiaro e scuro

---

## 🖼️ Screenshot

**Modalità chiaro:**

![Light Mode Screenshot](../../docs/screenshots/light_mode.png)

**Modalità scuro:**

![Dark Mode Screenshot](../../docs/screenshots/dark_mode.png)

---

## 🎬 Anteprima animata

![Animated Plotly Preview](../../docs/screenshots/animated_preview.gif)

---

## 📜 Licenza

Licenziato sotto [**MIT License**](../../LICENSE.md) - uso, modifica e distribuzione libera.

---

### ✨ Autore

**Perli Davide Andrea**
