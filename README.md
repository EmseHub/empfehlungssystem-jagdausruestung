# Prototyp für ein Empfehlungssystem für Jagdausrüstung

Dieses Repository enthält den frühen Prototypen eines Empfehlungssystems für Jagdausrüstung. Die interaktive Weboberfläche soll den ersten Entwurf des domänenspezifischen Bedarfsmodells (siehe auch [docs/Korrelationsmatrix.xlsx](docs/)) erfahrbar machen und die ersten Erkenntnisse aus den Interviews visualisieren.

## Projektaufbau

Der Prototyp wurde mit React, TypeScript, Vite und shadcn/ui umgesetzt. Da die grafische Oberfläche lediglich als frühe Demo dient und kein finales Design vorwegnehmen soll, bietet die Verwendung von [shadcn/ui](https://ui.shadcn.com/) einige Vorteile: Die Bibliothek ermöglicht die schnelle Erstellung leichtgewichtiger und flexibler GUIs, ohne unnötigen Overhead zu erzeugen. Gleichzeitig bleibt das System durch den direkten Zugriff auf den Quellcode der Komponenten jederzeit erweiter- und anpassbar.

Während die GUI bewusst minimal gehalten wird, ist das zugrundeliegende Datenmodell bereits solide und ausgereift. Es ist generisch aufgebaut, erweiterbar und erlaubt verschiedenste Darstellungs- und Interaktionsformen. Es bildet die Grundlage für die weitere Entwicklung des Empfehlungssystems, das letztendlich in den Onlineshop integriert werden soll.

### Hartkodierte Daten

Zunächst werden in [src/models/nutzungskontext.types.ts](src/models/nutzungskontext.types.ts) die verschiedenen **Dimensionen des Nutzungskontextes** definiert, die für die Auswahl von Jagdausrüstung relevant sind. Für jede Dimension ist festgelegt, welche Ausprägungen sie annehmen kann (Dimension _Terrain_ → Ausprägung _Sumpf_) und ob mehrere Ausprägungen gleichzeitig vorliegen können.

In [src/models/beduerfnis.types.ts](src/models/beduerfnis.types.ts) wiederum sind die aus den Interviews abgeleiteten **Bedürfnisse** von Jagenden und damit zusammenhängende Datentypen hinterlegt.

Das Herzstück des Modells bilden die Kontext-Regeln in [src/rules/kontextRegeln.ts](src/rules/kontextRegeln.ts). Sie bilden die **Beziehungen zwischen Kontextfaktoren und Bedürfnissen** ab, d. h. aus welchen Ausprägungen einer Dimension sich welche konkreten Bedürfnisse ergeben (Dimension _Terrain_ → Ausprägung _Sumpf_ → Bedürfnis _Wasserdichtigkeit_). In diesen Regeln wird jedem Bedürfnis ein Relevanzgewicht zugewiesen, um die Stärke der Beziehung zu quantifizieren. Etwa bei leichtem Niederschlag ist das Bedürfnis nach Wasserdichtigkeit schwächer ausgeprägt als bei Starkregen. Diese Abstufung muss abgebildet werden können. In Anlehnung an die QFD-Skala ([Wikipedia](https://de.wikipedia.org/wiki/Quality_Function_Deployment#Vorgehensweise)) wird ein Gewicht von 0,1 (`GERING`), 0,3 (`MITTEL`) oder 0,9 (`HOCH`) zugewiesen, um deutlichere Ergebnisse zu erhalten.

Das **Mapping von Bedürfnissen auf Produktmerkmale** ist in [src/rules/beduerfnisToProduktmerkmalMapping.ts](src/rules/beduerfnisToProduktmerkmalMapping.ts) definiert und bildet die Brücke zu konkreten Produkten.

Alle hartkodierten Definitionen werden im Projektverlauf verfeinert und könnten später aus dem Backend geladen werden.

### Logik

Aufbauend auf diese Modellstruktur ist der erste Entwurf der Interaktionslogik schnell erklärt:

Jagende wählen, welche Ausprägungen auf ihren individuellen Nutzungskontext zutreffen. Aus diesen Faktoren werden anschließend gewichtete Bedürfnisse abgeleitet ([src/logic/ermittleBeduerfnisse.ts](src/logic/ermittleBeduerfnisse.ts)), die wiederum in – ebenfalls gewichtete – Produktmerkmale übersetzt werden ([src/logic/ermittleProduktmerkmale.ts](src/logic/ermittleProduktmerkmale.ts)). Um eine Empfehlung zu generieren, muss nun lediglich sortiert und abgeglichen werden, welche Merkmale die höchste Relevanz besitzen und welche der verfügbaren Produkte ([src/data/produkte.ts](src/data/produkte.ts)) diese Merkmale aufweisen ([src/logic/filterProdukteNachMerkmalen.ts](src/logic/filterProdukteNachMerkmalen.ts)).

## Installation/Aufruf

Der aktuelle Stand kann unter [https://emsehub.github.io/empfehlungssystem-jagdausruestung/](https://emsehub.github.io/empfehlungssystem-jagdausruestung/) aufgerufen werden.

Um das Projekt lokal zu starten, müssen [Git](https://git-scm.com/install/windows) und [Node.js](https://nodejs.org/en/download) installiert sein. Erst dann können das Repository geklont und die Abhängigkeiten installiert werden:

```bash
git clone https://github.com/EmseHub/semesterprojekt-chatbot.git
cd empfehlungssystem-jagdausruestung
npm install
```

Danach kann die Anwendung mit folgendem Befehl gestartet werden:

```bash
npm run dev
```

Eine ausführliche Anleitung findet sich [hier](https://www.geeksforgeeks.org/reactjs/how-to-download-a-react-project-from-github-and-run-in-my-pc/).
