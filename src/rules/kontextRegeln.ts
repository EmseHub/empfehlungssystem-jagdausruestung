import type { KontextRegeln } from '@/models/kontextRegeln.types';
import { GEWICHT } from '@/models/beduerfnis.types';

export const kontextRegeln: KontextRegeln = {
    terrain: {
        Hochwald: [
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Geraeuscharmut', gewicht: GEWICHT.MITTEL },
        ],
        Niederwald: [
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.MITTEL },
        ],
        Sumpf: [
            { beduerfnis: 'Wasserdichtigkeit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.MITTEL },
        ],
        Gebirge: [
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Gewichtsreduktion', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.MITTEL },
        ],
        Feld: [
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.GERING },
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.MITTEL },
        ],
    },
    niederschlag: {
        'Kein Niederschlag': [],
        'Leichter Regen': [{ beduerfnis: 'Wasserdichtigkeit', gewicht: GEWICHT.MITTEL }],
        'Starker Regen': [
            { beduerfnis: 'Wasserdichtigkeit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Atmungsaktivitaet', gewicht: GEWICHT.GERING },
        ],
        Schnee: [
            { beduerfnis: 'Waerme', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Wasserdichtigkeit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.MITTEL },
        ],
    },
    temperatur: {
        'Sehr kalt (<0°C)': [{ beduerfnis: 'Waerme', gewicht: GEWICHT.HOCH }],
        'Kalt (0-5°C)': [{ beduerfnis: 'Waerme', gewicht: GEWICHT.MITTEL }],
        'Kühl (5-10°C)': [{ beduerfnis: 'Waerme', gewicht: GEWICHT.GERING }],
        'Mild (10-15°C)': [],
        'Warm (15-20°C)': [{ beduerfnis: 'Atmungsaktivitaet', gewicht: GEWICHT.MITTEL }],
        'Sehr warm (>20°C)': [
            { beduerfnis: 'Atmungsaktivitaet', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Gewichtsreduktion', gewicht: GEWICHT.GERING },
        ],
    },
    sonneneinstrahlung: {
        Gering: [],
        Mittel: [],
        Hoch: [
            { beduerfnis: 'Atmungsaktivitaet', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Gewichtsreduktion', gewicht: GEWICHT.GERING },
        ],
    },
    windstaerke: {
        Schwach: [],
        Mäßig: [{ beduerfnis: 'Waerme', gewicht: GEWICHT.GERING }],
        Stark: [
            { beduerfnis: 'Waerme', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.GERING },
        ],
    },
    luftfeuchtigkeit: {
        'Sehr trocken': [],
        'Trocken bis leicht feucht': [],
        Feucht: [{ beduerfnis: 'Wasserdichtigkeit', gewicht: GEWICHT.GERING }],
        'Nebel (sehr feucht)': [
            { beduerfnis: 'Wasserdichtigkeit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.GERING },
        ],
    },
    tageszeit: {
        Tag: [],
        Nacht: [
            { beduerfnis: 'Geraeuscharmut', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.MITTEL },
        ],
        Dämmerung: [{ beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.GERING }],
    },
    jagdart: {
        Drückjagd: [
            { beduerfnis: 'Sicherheit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.MITTEL },
        ],
        Ansitzjagd: [
            { beduerfnis: 'Geraeuscharmut', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Waerme', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.MITTEL },
        ],
        Nachsuche: [
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Sicherheit', gewicht: GEWICHT.MITTEL },
        ],
        Maisjagd: [
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.GERING },
        ],
    },
    rolle: {
        Schütze: [
            { beduerfnis: 'Geraeuscharmut', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.HOCH },
        ],
        Treiber: [
            { beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.MITTEL },
        ],
        Hundeführer: [
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Stauraum', gewicht: GEWICHT.GERING },
        ],
        Jagdleiter: [
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Sicherheit', gewicht: GEWICHT.MITTEL },
        ],
        Begleitperson: [{ beduerfnis: 'Beweglichkeit', gewicht: GEWICHT.GERING }],
    },
    erfahrung: {
        Anfänger: [
            { beduerfnis: 'Sicherheit', gewicht: GEWICHT.HOCH },
            { beduerfnis: 'Sichtbarkeit', gewicht: GEWICHT.HOCH },
        ],
        Fortgeschritten: [],
        Profi: [
            { beduerfnis: 'Tarnung', gewicht: GEWICHT.GERING },
            { beduerfnis: 'Geraeuscharmut', gewicht: GEWICHT.GERING },
        ],
    },
    jagdhaeufigkeit: {
        'Gering (1-5/Jahr)': [],
        'Mittel (6-15/Jahr)': [],
        'Hoch (16-30/Jahr)': [{ beduerfnis: 'Robustheit', gewicht: GEWICHT.GERING }],
        'Sehr hoch (30+/Jahr)': [
            { beduerfnis: 'Robustheit', gewicht: GEWICHT.MITTEL },
            { beduerfnis: 'Gewichtsreduktion', gewicht: GEWICHT.GERING },
        ],
    },
};
