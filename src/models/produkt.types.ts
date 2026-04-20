import type { BeduerfnisMitScore } from './beduerfnis.types';

//KI-generierte Beispielmerkmale
export type Produktmerkmal =
    | 'Daunenisolierung'
    | 'Merinowolle'
    | 'GoreTexMembran'
    | 'SilentFabric'
    | 'Softshell'
    | 'Camouflage'
    | 'Signalorange'
    | 'StretchMaterial'
    | 'VerstaerkteNaehte'
    | 'Leichtgewicht'
    | 'GrosseTaschen'
    | 'Reflektoren';

export type Produktkategorie = 'Jacke' | 'Weste' | 'Hose' | 'Rucksack' | 'Schuhe' | 'Zubehoer';

export interface Produkt {
    id: string;
    name: string;
    kategorie: Produktkategorie;
    produktmerkmale: Produktmerkmal[];
    preis: number;
    imageUrl?: string;
}

// Beschreibt das anhand des Nutzungskontexts abgeleitete Relevanzgewicht eines Produktmerkmals
export interface ProduktmerkmalMitScore {
    produktmerkmal: Produktmerkmal;
    score: number;
    // Optional: Die Bedürfnisse, die durch dieses Merkmal erfüllt werden (TODO)
    relevanteBeduerfnisse: BeduerfnisMitScore[];
}

export interface ProduktEmpfehlung {
    produkt: Produkt;
    score: number;
    // Optional: Die relevantesten Merkmale, die zu dieser Empfehlung geführt haben
    relevanteMerkmale: ProduktmerkmalMitScore[];
}
