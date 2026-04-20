import type { BeduerfnisGewichtet } from './beduerfnis.types';
import type { Nutzungskontext } from './nutzungskontext.types';

// ##### Mapping: Kontext → gewichtete Bedürfnisse #####

// interface KontextRegeln {
//     terrain: { [T in Terrain]: BeduerfnisGewichtet[] };
//     niederschlag: { [N in Niederschlag]: BeduerfnisGewichtet[] };
//     temperatur: { [T in Temperatur]: BeduerfnisGewichtet[] };
//     sonneneinstrahlung: { [S in Sonneneinstrahlung]: BeduerfnisGewichtet[] };
//     windstaerke: { [W in Windstaerke]: BeduerfnisGewichtet[] };
//     luftfeuchtigkeit: { [L in Luftfeuchtigkeit]: BeduerfnisGewichtet[] };
//     tageszeit: { [T in Tageszeit]: BeduerfnisGewichtet[] };
//     jagdart: { [J in Jagdart]: BeduerfnisGewichtet[] };
//     rolle: { [R in Rolle]: BeduerfnisGewichtet[] };
//     erfahrung: { [E in Erfahrung]: BeduerfnisGewichtet[] };
//     jagdhaeufigkeit: { [J in Jagdhaeufigkeit]: BeduerfnisGewichtet[] };
// }

export type DimensionRegeln<Dimension extends keyof Nutzungskontext> = {
    // [Auspraegung in Extract<Nutzungskontext[Dimension] extends (infer U)[] ? U : Nutzungskontext[Dimension], string>]?: BeduerfnisGewichtet[];
    [Auspraegung in Extract<
        Nutzungskontext[Dimension] extends (infer U)[] ? U : Nutzungskontext[Dimension],
        string
    >]: BeduerfnisGewichtet[];
};

export type KontextRegeln = {
    [Dimension in keyof Nutzungskontext]: DimensionRegeln<Dimension>;
};
