# 🐾 Tierarztpraxis Aurelia – Website (Grün & Gold)

Willkommen im Quellcode für die offizielle, hochmoderne Website der **Tierarztpraxis Aurelia**. Diese Webseite wurde mit einem luxuriösen Farbschema in Tiefgrün und warmem Gold sowie unter Einhaltung modernster Web-Standards (HTML5, CSS3 mit Custom Properties & Flexbox/Grid und Vanilla JavaScript) entwickelt.

Das Projekt ist vollständig statisch aufgebaut – es erfordert **keine komplexen Build-Prozesse** (wie npm run build) und eignet sich daher hervorragend für das Hosting auf **GitHub Pages**.

---

## 📂 Ordnerstruktur

Das Projekt ist wie folgt aufgebaut:

```text
tierarzt-praxis/
├── index.html          # Semantische Struktur der Website & SEO-Optimierung
├── styles.css          # Edles Grün-Gold-Designsystem & Responsive Layouts
├── script.js           # Navigation, Slider & der interaktive Terminbuchungs-Assistent
├── assets/
│   ├── logo.svg        # Elegantes, individuelles Vektor-Logo (Hund & Katze vereint)
│   └── animals/        # Speziell gezeichnete Vektor-Icons für den Buchungs-Assistenten
│       ├── dog.svg
│       ├── cat.svg
│       ├── rabbit.svg
│       └── bird.svg
└── README.md           # Diese Anleitung (Deutsch)
```

---

## 🚀 Anleitung zur Veröffentlichung auf GitHub Pages

Da es sich um ein rein statisches Webprojekt handelt, ist die Veröffentlichung bei GitHub in wenigen Minuten erledigt. Sie haben zwei einfache Möglichkeiten:

### Methode 1: Über das Terminal (Git) – *Empfohlen*

Wenn Sie Git auf Ihrem Mac installiert haben, folgen Sie diesen Schritten:

1. **GitHub-Repository erstellen**:
   Gehen Sie auf [github.com](https://github.com) und erstellen Sie ein neues, leeres Repository (z. B. mit dem Namen `tierarzt-praxis`). Lassen Sie die Optionen "Add a README" und ".gitignore" deaktiviert.

2. **Terminal im Projektordner öffnen**:
   Navigieren Sie in Ihrem Terminal in dieses Verzeichnis:
   ```bash
   cd /Users/ryannienaber/.gemini/antigravity/scratch/tierarzt-praxis
   ```

3. **Git initialisieren & Code pushen**:
   Führen Sie folgende Befehle aus (ersetzen Sie `DEIN_BENUTZERNAME` durch Ihren GitHub-Nutzernamen):
   ```bash
   git init
   git add .
   git commit -m "Initialer Commit: Premium Tierarztpraxis Website"
   git branch -M main
   git remote add origin https://github.com/DEIN_BENUTZERNAME/tierarzt-praxis.git
   git push -u origin main
   ```

### Methode 2: Über GitHub Desktop (Grafische Oberfläche)

1. Laden Sie [GitHub Desktop](https://desktop.github.com/) herunter und melden Sie sich an.
2. Wählen Sie **"Add Existing Repository"** und wählen Sie diesen Ordner aus (`/Users/ryannienaber/.gemini/antigravity/scratch/tierarzt-praxis`).
3. GitHub Desktop wird Sie darauf hinweisen, dass dort noch kein Git-Repository existiert. Klicken Sie auf **"create a repository"** im Hinweistext.
4. Klicken Sie auf **"Publish Repository"**, um es auf GitHub hochzuladen.

---

## 🌐 Aktivierung von GitHub Pages

Sobald Ihr Code auf GitHub hochgeladen ist, aktivieren Sie die Webseite:

1. Rufen Sie Ihr Repository auf GitHub im Browser auf.
2. Klicken Sie oben rechts auf **"Settings"** (Einstellungen).
3. Wählen Sie in der linken Seitenleiste den Reiter **"Pages"**.
4. Unter **"Build and deployment" -> "Source"** wählen Sie **"Deploy from a branch"**.
5. Unter **"Branch"** wählen Sie im Dropdown-Menü **`main`** (und `/root` im danebenliegenden Ordner-Dropdown) und klicken auf **"Save"** (Speichern).
6. Nach ca. 30–60 Sekunden generiert GitHub Ihre Live-URL. Diese sieht in der Regel so aus:
   `https://DEIN_BENUTZERNAME.github.io/tierarzt-praxis/`

---

## 🔑 Option: Eigene Domain verknüpfen (z.B. `tierarzt-aurelia.de`)

Falls Sie eine eigene Domain für die Praxis besitzen, können Sie diese ganz einfach nutzen:

1. Gehen Sie in Ihrem GitHub-Repository unter **"Settings" -> "Pages"**.
2. Tragen Sie unter **"Custom domain"** Ihre Adresse ein (z. B. `www.tierarzt-aurelia.de`) und klicken Sie auf **"Save"**.
3. Richten Sie bei Ihrem Domain-Provider (z. B. Ionos, Strato, GoDaddy) einen **CNAME-Eintrag** für Ihre Subdomain `www` ein, der auf `DEIN_BENUTZERNAME.github.io` verweist, sowie **A-Records** für die Hauptdomain auf die GitHub Pages-IPs:
   * `185.199.108.153`
   * `185.199.109.153`
   * `185.199.110.153`
   * `185.199.111.153`
4. Aktivieren Sie in den GitHub-Einstellungen die Option **"Enforce HTTPS"** (Sichere Verbindung).

---

## ✨ Besondere Highlights dieser Implementierung

* **Premium Grün-Gold Ästhetik**: Goldene Verläufe, harmonische HSL-Schattierungen, weiche Hintergrundfarben und elegante Typografie (Playfair Display für Überschriften).
* **Ausgezeichnetes Responsive Design**: Perfekt optimiert für Mobiltelefone, Tablets und große 4K-Monitore.
* **Mehrstufiger Termin-Assistent**: Ein vollständig animierter, interaktiver Wizard, mit dem Tierhalter die Tierart (Hund, Katze, etc.), die Leistung und einen freien Zeitslot wählen können. Nach Eingabe der Halterdaten wird eine Zusammenfassung ausgegeben.
* **Pulsierender Notdienst-Banner**: Ein klarer Notfall-Bereich mit Anruflink (`tel:`), der auf Smartphones mit einem Klick die Praxis-Notrufnummer wählt.
* **Barrierefreiheit & SEO**: Korrekte semantische Struktur (`<header>`, `<main>`, `<footer>`, `<dialog>`), Alt-Attribute und kontrastreiche HSL-Farbwerte.
