# 🎵 Custom Function Acoustics

**Creează, vizualizează și ascultă semnale matematice personalizate în timp real.**
O aplicație web interactivă bazată pe Django care combină **procesarea semnalelor în Python (NumPy, SciPy)** cu vizualizări frontend **Plotly.js** - toate într-o interfață responsivă cu **mod întunecat/lumină**.

---

## 📑 Cuprins

1. [Prezentare generală](#-prezentare-generală)
2. [Bază matematică](#-bază-matematică)
3. [Funcționalități](#-funcționalități)
4. [Stack tehnologic](#-stack-tehnologic)
5. [Aspecte frontend](#-aspecte-frontend)
6. [Prezentare backend](#-prezentare-backend)
7. [Structura proiectului](#-structura-proiectului)
8. [Instalare și configurare](#-instalare-și-configurare)
9. [Cum se rulează](#-cum-se-rulează)
10. [Capturi de ecran](#-capturi-de-ecran)
11. [Previzualizare animată](#-previzualizare-animată)
12. [Licență](#-licență)

---

## 🧭 Prezentare generală

Această aplicație web permite utilizatorilor să creeze și să exploreze **semnale periodice personalizate** interactiv.

Poți:

* Alege un tip de semnal (`sin`, `cos`, `tan`, `cotan`, `sawtooth`, `square`)
* Ajusta parametri precum **frecvența**, **amplitudinea**, **durata**, **faza** și **rata de eșantionare**(**când selectați valori mari pentru frecvență și rată de eșantionare, așteptați până când pagina se reîncarcă, deoarece durează timp pentru a calcula**)
* Vizualizați graficul (plasați cursorul peste el și puteți mări imaginea, selecta o piesă, o puteți descărca etc.)
* Observa grafice dinamice ale semnalului cu Plotly
* Reda semnalul generat în timp real

Servește atât ca **instrument educațional** pentru analiza semnalelor, cât și ca **sandbox vizual** pentru explorarea comportamentului formelor de undă.

---

## 📐 Bază matematică

La baza sa, semnalul generat se construiește din ecuația frecvenței unghiulare:

$$
f(t) = 2\pi \cdot \text{frequency} \cdot t + \phi
$$

unde:

* $t$ - timp (secunde)
* $\phi = \text{coeficient de fază} \cdot \pi$ - decalaj de fază în radiani pe axa X
* $\text{frequency}$ - numărul de oscilații pe secundă
* $\text{amplitude}$ - amplitudinea semnalului pe axa Y

Semnalul de ieșire $s(t)$ depinde de funcția selectată:

$$
s(t) =
\begin{cases}
amplitude * \sin(f(t)), & \text{Undă sinus} \\
amplitude * \cos(f(t)), & \text{Undă cosinus} \\
amplitude * \tan(f(t)), & \text{Undă tangentă} \\
amplitude * \cot(f(t)) = \frac{1}{\tan(f(t))}, & \text{Undă cotangentă} \\
amplitude * \text{sawtooth}(f(t)), & \text{Undă sawtooth} \\
amplitude * \text{square}(f(t)), & \text{Undă pătrată}
amplitude * \end{cases}
$$

Aceste semnale sunt calculate folosind **NumPy** și **SciPy**, apoi serializate în JSON pentru vizualizare interactivă în frontend.

---

## ⚙️ Funcționalități

✅ **Generare semnale în timp real**
✅ **Slidere interactive pentru parametri**
✅ **Grafice dinamice cu Plotly.js**
✅ **Redare instantanee audio prin Web Audio API**
✅ **Mod întunecat/lumină persistent** cu `localStorage`
✅ **Calcul rapid în backend folosind NumPy & SciPy**

---

## 🧩 Stack tehnologic

| Strat                | Tehnologie                                         |
| :------------------- | :------------------------------------------------- |
| **Frontend**         | HTML5, CSS3, JavaScript (Plotly.js, Web Audio API) |
| **Backend**          | Django, Python (NumPy, SciPy)                      |
| **Comunicare**       | JSON între view-ul Django și template              |
| **Vizualizare date** | Grafice dinamice Plotly.js                         |
| **Stilizare**        | CSS cu toggle mod întunecat/lumină                 |

---

## 💡 Aspecte frontend

* **Grafice Plotly.js:**
  Grafice interactive, redimensionabile și responsive care se actualizează în timp real.

* **Mod întunecat/lumină:**
  Implementare cu tranziție lină și memorare în local storage.
  Elimină problemele comune de flickering și interacțiunea cu câmpurile de input.

* **Redare semnal:**
  Folosește Web Audio API pentru a genera sunet direct din datele formei de undă.

---

## 🧠 Prezentare backend

View-ul Django calculează semnalul astfel:

```python
phase = phase_coefficient * np.pi
t = np.linspace(0, duration, int(duration * sampling_frequency))
f = 2 * np.pi * frequency * t + phase
```

Apoi, în funcție de funcția aleasă:

```python
if func == "sin":
    semnal = amplitude * np.sin(f)
elif func == "cos":
    semnal = amplitude * np.cos(f)
elif func == "sawtooth":
    semnal = amplitude * sig.sawtooth(f)
elif func == "square":
    semnal = amplitude * sig.square(f)
```

Rezultatul este trimis template-ului ca JSON pentru afișarea în frontend:

```python
data_to_send = {'x': t.tolist(), 'y': semnal.tolist(), 'title': title}
```

---

## 📁 Structura proiectului

```
custom-function-acoustics/
├── manage.py
├── requirements.txt
├── backend/                         # Logica aplicației Django
│   ├── views.py                     # Generare semnal și logica de răspuns
│   ├── urls.py                      # Rutare URL-uri
│   ├── models.py                    
│   ├── templates/
│   │   └── mainPage.html            # Template principal cu logica frontend
│   └── static/
│       ├── js/
│       │   ├── plot_generation.js   # Grafice Plotly, sunet, animație
│       │   ├── fomrInput.js         # Procesare input utilizator
│       │   └── lightMode.js         # Funcționalitate mod întunecat/lumină
│       └── css/
│          └── mainPage.css          # Stilizare UI
├── docs/
│   └── screenshots/                 # Capturi și GIF-uri
│       ├── light_mode.png
│       ├── dark_mode.png
│       └── animated_preview.gif
├── Dockerfile                       # Pentru a rula în interiorul unui container
├── docker-compose.yml               # Pentru a rula în interiorul unui container
└── README.md
```

---

## 🧰 Instalare și configurare

### 1️⃣ Clonare repository

```bash
git clone https://github.com/yourusername/custom-function-acoustics.git
cd custom-function-acoustics
```

### 2️⃣ Creare și activare mediu virtual

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

### 3️⃣ Instalare dependențe

**Din fișier:**

```bash
pip install -r requirements.txt
```

**Manual:**

```bash
pip install django numpy scipy
```

---

## 🚀 Cum se rulează

```bash
cd function_acoustics
python manage.py runserver
```

### Dacă preferați să rulați proiectul într-un container Docker (nu este necesară configurarea locală a Python):

🐳 Rulați cu Docker

```bash
docker compose up --build
```

Apoi deschide browserul și vizitează:
👉 [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

Acum poți:

* Selecta o formă de undă (Sin, Cos, Tan, Cotan, Sawtooth, Square)
* Ajusta parametri precum frecvența, amplitudinea, durata etc.
* Observa schimbarea semnalului instant pe grafic
* Reda semnalul
* Schimba între mod întunecat și lumină

---

## 🖼️ Capturi de ecran

**Mod Lumină:**

> ![Light Mode Screenshot](../../docs/screenshots/light_mode.png)

**Mod Întunecat:**

> ![Dark Mode Screenshot](../../docs/screenshots/dark_mode.png)

---

## 🎬 Previzualizare animată

> ![Animated Plotly Preview](../../docs/screenshots/animated_preview.gif)

---

## 📜 Licență

Licențiat sub [**MIT License**](../../../LICENSE.md) - utilizare, modificare și distribuire liberă.

---

### ✨ Autor

**Perli Davide Andrea**
