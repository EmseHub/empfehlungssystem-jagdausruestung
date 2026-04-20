import type { Value } from './utils';

/* --- BACKUP---

// Dimensionen & Ausprägungen
export type Terrain = 'Hochwald' | 'Niederwald' | 'Sumpf' | 'Gebirge' | 'Feld';
export type Niederschlag = 'Kein Niederschlag' | 'Leichter Regen' | 'Starker Regen' | 'Schnee';
export type Temperatur =
    | 'Sehr kalt (<0°C)'
    | 'Kalt (0-5°C)'
    | 'Kühl (5-10°C)'
    | 'Mild (10-15°C)'
    | 'Warm (15-20°C)'
    | 'Sehr warm (>20°C)';
export type Sonneneinstrahlung = 'Gering' | 'Mittel' | 'Hoch';
export type Windstaerke = 'Schwach' | 'Mäßig' | 'Stark';
export type Luftfeuchtigkeit = 'Sehr trocken' | 'Trocken bis leicht feucht' | 'Feucht' | 'Nebel (sehr feucht)';
export type Tageszeit = 'Tag' | 'Nacht' | 'Dämmerung';
export type Jagdart = 'Drückjagd' | 'Ansitzjagd' | 'Nachsuche' | 'Maisjagd';
export type Rolle = 'Schütze' | 'Treiber' | 'Hundeführer' | 'Jagdleiter' | 'Begleitperson';
export type Erfahrung = 'Anfänger' | 'Fortgeschritten' | 'Profi';
export type Jagdhaeufigkeit = 'Gering (1-5/Jahr)' | 'Mittel (6-15/Jahr)' | 'Hoch (16-30/Jahr)' | 'Sehr hoch (30+/Jahr)';

// Gesamtkontext-Interface
export interface Nutzungskontext {
    // Terrain
    terrain: Terrain[];

    // Niederschlag
    niederschlag: Niederschlag;

    // Temperatur
    temperatur: Temperatur;

    // Sonneneinstrahlung
    sonneneinstrahlung: Sonneneinstrahlung;

    // Windstärke
    windstaerke: Windstaerke;

    // Luftfeuchtigkeit (trocken bis nebelig)
    luftfeuchtigkeit: Luftfeuchtigkeit;

    // Tageszeit
    tageszeit: Tageszeit;

    // Optional (für spätere Erweiterung)
    jagdart: Jagdart[];

    // Rolle bei der Jagd
    rolle: Rolle[];

    // Erfahrungsniveau
    erfahrung: Erfahrung;

    // Anzahl der Teilnahme an Jagden pro Jahr
    jagdhaeufigkeit: Jagdhaeufigkeit;
}




*/

//#region Hardcoded-Daten: Dimensionen & Ausprägungen
export const DIMENSIONEN = {
    TERRAIN: {
        MEHRFACHAUSWAHL: true,
        TITEL: 'Terrain',
        AUSPRAEGUNGEN: {
            HOCHWALD: 'Hochwald',
            NIEDERWALD: 'Niederwald',
            SUMPF: 'Sumpf',
            GEBIRGE: 'Gebirge',
            FELD: 'Feld',
        },
    },
    NIEDERSCHLAG: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Niederschlag',
        AUSPRAEGUNGEN: {
            KEIN_NIEDERSCHLAG: 'Kein Niederschlag',
            LEICHTER_REGEN: 'Leichter Regen',
            STARKER_REGEN: 'Starker Regen',
            SCHNEE: 'Schnee',
        },
    },
    TEMPERATUR: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Temperatur',
        AUSPRAEGUNGEN: {
            SEHR_KALT: 'Sehr kalt (<0°C)',
            KALT: 'Kalt (0-5°C)',
            KUEHL: 'Kühl (5-10°C)',
            MILD: 'Mild (10-15°C)',
            WARM: 'Warm (15-20°C)',
            SEHR_WARM: 'Sehr warm (>20°C)',
        },
    },
    SONNENEINSTRAHLUNG: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Sonneneinstrahlung',
        AUSPRAEGUNGEN: {
            GERING: 'Gering',
            MITTEL: 'Mittel',
            HOCH: 'Hoch',
        },
    },
    WINDSTAERKE: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Windstärke',
        AUSPRAEGUNGEN: {
            SCHWACH: 'Schwach',
            MAESSIG: 'Mäßig',
            STARK: 'Stark',
        },
    },
    LUFTFEUCHTIGKEIT: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Luftfeuchtigkeit',
        AUSPRAEGUNGEN: {
            SEHR_TROCKEN: 'Sehr trocken',
            TROCKEN_LEICHT_FEUCHT: 'Trocken bis leicht feucht',
            FEUCHT: 'Feucht',
            NEBEL: 'Nebel (sehr feucht)',
        },
    },
    TAGESZEIT: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Tageszeit',
        AUSPRAEGUNGEN: {
            TAG: 'Tag',
            NACHT: 'Nacht',
            DAEMMERUNG: 'Dämmerung',
        },
    },
    // Optional (für spätere Erweiterung) (TODO)
    JAGDART: {
        MEHRFACHAUSWAHL: true,
        TITEL: 'Jagdart',
        AUSPRAEGUNGEN: {
            DRUECKJAGD: 'Drückjagd',
            ANSITZJAGD: 'Ansitzjagd',
            NACHSUCHE: 'Nachsuche',
            MAISJAGD: 'Maisjagd',
        },
    },
    ROLLE: {
        MEHRFACHAUSWAHL: true,
        TITEL: 'Rolle',
        AUSPRAEGUNGEN: {
            SCHUETZE: 'Schütze',
            TREIBER: 'Treiber',
            HUNDEFUEHRER: 'Hundeführer',
            JAGDLEITER: 'Jagdleiter',
            BEGLEITPERSON: 'Begleitperson',
        },
    },
    ERFAHRUNG: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Erfahrung',
        AUSPRAEGUNGEN: {
            ANFAENGER: 'Anfänger',
            FORTGESCHRITTEN: 'Fortgeschritten',
            PROFI: 'Profi',
        },
    },
    // Anzahl der Teilnahme an Jagden pro Jahr
    JAGDHAEUFIGKEIT: {
        MEHRFACHAUSWAHL: false,
        TITEL: 'Jagdhäufigkeit pro Jahr',
        AUSPRAEGUNGEN: {
            GERING: 'Gering (1-5/Jahr)',
            MITTEL: 'Mittel (6-15/Jahr)',
            HOCH: 'Hoch (16-30/Jahr)',
            SEHR_HOCH: 'Sehr hoch (30+/Jahr)',
        },
    },
} as const;
//#endregion

//#region Gesamtkontext-Interface

// --------- A ---------

// type Terrain = Value<typeof DIMENSIONEN.TERRAIN.AUSPRAEGUNGEN>;
// type Niederschlag = Value<typeof DIMENSIONEN.NIEDERSCHLAG.AUSPRAEGUNGEN>;
// type Temperatur = Value<typeof DIMENSIONEN.TEMPERATUR.AUSPRAEGUNGEN>;
// type Sonneneinstrahlung = Value<typeof DIMENSIONEN.SONNENEINSTRAHLUNG.AUSPRAEGUNGEN>;
// type Windstaerke = Value<typeof DIMENSIONEN.WINDSTAERKE.AUSPRAEGUNGEN>;
// type Luftfeuchtigkeit = Value<typeof DIMENSIONEN.LUFTFEUCHTIGKEIT.AUSPRAEGUNGEN>;
// type Tageszeit = Value<typeof DIMENSIONEN.TAGESZEIT.AUSPRAEGUNGEN>;
// type Jagdart = Value<typeof DIMENSIONEN.JAGDART.AUSPRAEGUNGEN>;
// type Rolle = Value<typeof DIMENSIONEN.ROLLE.AUSPRAEGUNGEN>;
// type Erfahrung = Value<typeof DIMENSIONEN.ERFAHRUNG.AUSPRAEGUNGEN>;
// type Jagdhaeufigkeit = Value<typeof DIMENSIONEN.JAGDHAEUFIGKEIT.AUSPRAEGUNGEN>;

// export interface Nutzungskontext {
//     terrain: Terrain[];
//     niederschlag: Niederschlag;
//     temperatur: Temperatur;
//     sonneneinstrahlung: Sonneneinstrahlung;
//     windstaerke: Windstaerke;
//     luftfeuchtigkeit: Luftfeuchtigkeit;
//     tageszeit: Tageszeit;
//     jagdart: Jagdart[];
//     rolle: Rolle[];
//     erfahrung: Erfahrung;
//     jagdhaeufigkeit: Jagdhaeufigkeit;
// }

// --------- B ---------

// export interface Nutzungskontext {
//     terrain: Value<typeof DIMENSIONEN.TERRAIN.AUSPRAEGUNGEN>[];
//     niederschlag: Value<typeof DIMENSIONEN.NIEDERSCHLAG.AUSPRAEGUNGEN>;
//     temperatur: Value<typeof DIMENSIONEN.TEMPERATUR.AUSPRAEGUNGEN>;
//     sonneneinstrahlung: Value<typeof DIMENSIONEN.SONNENEINSTRAHLUNG.AUSPRAEGUNGEN>;
//     windstaerke: Value<typeof DIMENSIONEN.WINDSTAERKE.AUSPRAEGUNGEN>;
//     luftfeuchtigkeit: Value<typeof DIMENSIONEN.LUFTFEUCHTIGKEIT.AUSPRAEGUNGEN>;
//     tageszeit: Value<typeof DIMENSIONEN.TAGESZEIT.AUSPRAEGUNGEN>;
//     jagdart: Value<typeof DIMENSIONEN.JAGDART.AUSPRAEGUNGEN>[];
//     rolle: Value<typeof DIMENSIONEN.ROLLE.AUSPRAEGUNGEN>[];
//     erfahrung: Value<typeof DIMENSIONEN.ERFAHRUNG.AUSPRAEGUNGEN>;
//     jagdhaeufigkeit: Value<typeof DIMENSIONEN.JAGDHAEUFIGKEIT.AUSPRAEGUNGEN>;
// }

// --------- C ---------

export type Dimensionen = typeof DIMENSIONEN;
export type DimensionKey = keyof Dimensionen;
// export type DimensionValue = Dimensionen[DimensionKey];

/* 
    export type AuspraegungKey_OLD = {
        [K in DimensionKey]: keyof Dimensionen[K]['AUSPRAEGUNGEN'];
    }[DimensionKey];

    export type AuspraegungValue_OLD = {
        [K in DimensionKey]: Dimensionen[K]['AUSPRAEGUNGEN'][keyof Dimensionen[K]['AUSPRAEGUNGEN']];
    }[DimensionKey];

 */
export type AuspraegungKey = Value<{ [K in DimensionKey]: keyof Dimensionen[K]['AUSPRAEGUNGEN'] }>;
export type AuspraegungValue = Value<{ [K in DimensionKey]: Value<Dimensionen[K]['AUSPRAEGUNGEN']> }>;

export interface AuspraegungOption {
    key: AuspraegungKey;
    label: AuspraegungValue;
}

export type Nutzungskontext_OLD = {
    [K in DimensionKey as Lowercase<string & K>]: Dimensionen[K] extends { MEHRFACHAUSWAHL: true }
        ? Array<Value<Dimensionen[K]['AUSPRAEGUNGEN']>>
        : Value<Dimensionen[K]['AUSPRAEGUNGEN']>;
};

export type Nutzungskontext = {
    [K in DimensionKey as Lowercase<K & string>]: Dimensionen[K]['MEHRFACHAUSWAHL'] extends true
        ? Value<Dimensionen[K]['AUSPRAEGUNGEN']>[]
        : Value<Dimensionen[K]['AUSPRAEGUNGEN']>;
};
export type NutzungskontextKey = keyof Nutzungskontext;
//#endregion
