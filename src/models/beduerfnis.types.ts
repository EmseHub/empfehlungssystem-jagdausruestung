import type { Value } from './utils';

export type Beduerfnis =
    | 'Waerme'
    | 'Wasserdichtigkeit'
    | 'Geraeuscharmut'
    | 'Beweglichkeit'
    | 'Tarnung'
    | 'Sichtbarkeit'
    | 'Robustheit'
    | 'Stauraum'
    | 'Atmungsaktivitaet'
    | 'Gewichtsreduktion'
    | 'Sicherheit';

export const GEWICHT = {
    GERING: 0.1,
    MITTEL: 0.3,
    HOCH: 0.9,
} as const;

type Gewicht = Value<typeof GEWICHT>;

// Beschreibt das in den Kontext-Regeln (fest) definierte Gewicht eines Bedürfnisses
export interface BeduerfnisGewichtet {
    beduerfnis: Beduerfnis;
    gewicht: Gewicht;
}

// Beschreibt das anhand des Nutzungskontexts abgeleitete Relevanzgewicht eines Bedürfnisses
export interface BeduerfnisMitScore {
    beduerfnis: Beduerfnis;
    score: number;
}
