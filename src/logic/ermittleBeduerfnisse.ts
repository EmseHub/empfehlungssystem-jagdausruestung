import { tempLogData } from '@/App';
import type { Beduerfnis, BeduerfnisMitScore } from '@/models/beduerfnis.types';
import type { KontextRegeln } from '@/models/kontextRegeln.types';
import type { Nutzungskontext } from '@/models/nutzungskontext.types';
import type { UnionToIntersection } from '@/models/utils';

export function ermittleBeduerfnisse(
    nutzungskontext: Nutzungskontext,
    kontextRegeln: KontextRegeln
): BeduerfnisMitScore[] {
    const scoreMap = new Map<Beduerfnis, number>();

    // Über alle Dimensionen iterieren, für die Kontext-Regeln (Ausprägung-Bedürfnis-Mappings) definiert sind
    for (const dimensionKey in kontextRegeln) {
        // const dimensionKeyTyped = dimensionKey as keyof Nutzungskontext;
        const dimensionKeyTyped = dimensionKey as keyof typeof kontextRegeln;

        // Ausprägung-Bedürfnis-Mappings der Dimension abrufen (etwa Dimension `Niederschlag` → [Ausprägung `Starker Regen` → [Bedürfnis `Wasserdichtigkeit`, ...], ...])
        const regelnOfDimension = kontextRegeln[dimensionKeyTyped];
        if (!regelnOfDimension) continue;

        const regelnOfDimensionJoined = regelnOfDimension as UnionToIntersection<typeof regelnOfDimension>;

        // Vom User gewählte Ausprägung(en) (Array oder einzelner Wert) der Dimension abrufen (etwa `Niederschlag` → `Starker Regen`, etc.)
        const selectedAuspraegungen = nutzungskontext[dimensionKeyTyped];
        // Ausprägungen immer als Array behandeln
        const selectedAuspraegungenArray = Array.isArray(selectedAuspraegungen)
            ? selectedAuspraegungen
            : [selectedAuspraegungen];

        // Über alle gewählten Ausprägungen der Dimension iterieren, um Bedürfnisse gewichtet zusammenzustellen
        for (const auspraegung of selectedAuspraegungenArray) {
            // Gewichtete Bedürfnisse der Ausprägung abrufen (etwa `Starker Regen` → [Bedürfnis `Wasserdichtigkeit` mit hohem Gewicht, ...])

            // const auspraegungKeyTyped = auspraegung as keyof KontextRegeln[typeof dimensionKeyTyped];
            // const beduerfnisseGewichtet = regelnOfDimension[auspraegungKeyTyped];
            const beduerfnisseGewichtet = regelnOfDimensionJoined[auspraegung];
            if (!beduerfnisseGewichtet) continue;

            /* 
                Beispiel:

                const beduerfnisseGewichtet = kontextRegeln['niederschlag']['Starker Regen'];

                entspricht 

                const regelnOfDimension = kontextRegeln['niederschlag'];
                const auspraegungKeyTyped = 'Starker Regen' as keyof typeof regelnOfDimension;
                const beduerfnisseGewichtet = regelnOfDimension[auspraegungKeyTyped];
             */

            // Gewichte zur Gesamtgewichtung der Bedürfnisse addieren (etwa `Wasserdichtigkeit` +1.0 für `Starker Regen`, etc.)
            for (const beduerfnisGewichtet of beduerfnisseGewichtet) {
                // const gewicht = Number(GEWICHT_OPTIONEN[beduerfnisGewichtet.gewicht]);
                const gewicht = beduerfnisGewichtet.gewicht;

                const scoreCurrent = scoreMap.get(beduerfnisGewichtet.beduerfnis) ?? 0;
                const scoreNew = scoreCurrent + gewicht;

                scoreMap.set(beduerfnisGewichtet.beduerfnis, scoreNew);
            }
        }
    }

    const sortedResult = Array.from(scoreMap, ([beduerfnis, score]) => ({ beduerfnis, score })).sort(
        (a, b) => b.score - a.score
    );

    console.log(
        sortedResult.map((item, index) => `${index + 1}. ${item.beduerfnis}: ${item.score.toFixed(4)}`).join('\n')
    );

    tempLogData.beduerfnisseMitScore = sortedResult.slice(0, 10);
    return sortedResult;
}
