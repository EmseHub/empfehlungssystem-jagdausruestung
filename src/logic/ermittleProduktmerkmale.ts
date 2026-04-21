import { tempLogData } from '@/App';
import type { BeduerfnisMitScore } from '@/models/beduerfnis.types';
import type { BeduerfnisToProduktmerkmalMapping } from '@/models/beduerfnisToProduktmerkmalMapping.types';
import type { Produktmerkmal, ProduktmerkmalMitScore } from '@/models/produkt.types';

export function ermittleProduktmerkmale(
    beduerfnisseMitScore: BeduerfnisMitScore[],
    mapping: BeduerfnisToProduktmerkmalMapping[]
): ProduktmerkmalMitScore[] {
    // Mapping für schnellen Zugriff indizieren
    const mappingLookup = new Map(mapping.map((m) => [m.beduerfnis, m.produktmerkmale]));

    // const scoreMap = new Map<Produktmerkmal, number>();
    const scoreMap = new Map<Produktmerkmal, { score: number; relevanteBeduerfnisse: BeduerfnisMitScore[] }>();

    // Scores aggregieren
    for (const beduerfnisMitScore of beduerfnisseMitScore) {
        const produktmerkmale = mappingLookup.get(beduerfnisMitScore.beduerfnis);
        if (!produktmerkmale) continue;

        // for (const merkmal of produktmerkmale) {
        //     const scoreCurrent = scoreMap.get(merkmal) ?? 0;
        //     const scoreNew = scoreCurrent + beduerfnisMitScore.score;

        //     scoreMap.set(merkmal, scoreNew);
        // }

        for (const produktmerkmal of produktmerkmale) {
            const entry = scoreMap.get(produktmerkmal) ?? {
                score: 0,
                relevanteBeduerfnisse: [],
            };

            entry.score += beduerfnisMitScore.score;
            entry.relevanteBeduerfnisse.push(beduerfnisMitScore);

            scoreMap.set(produktmerkmal, entry);
        }
    }

    // In Array umwandeln und sortieren
    // const sortedResult = Array.from(scoreMap, ([produktmerkmal, score]) => ({ produktmerkmal, score })).sort(
    //     (a, b) => b.score - a.score
    // );

    const sortedResult = Array.from(scoreMap, ([produktmerkmal, data]) => ({
        produktmerkmal,
        score: data.score,
        relevanteBeduerfnisse: data.relevanteBeduerfnisse,
    })).sort((a, b) => b.score - a.score);

    console.log(
        sortedResult.map((item, index) => `${index + 1}. ${item.produktmerkmal}: ${item.score.toFixed(4)}`).join('\n')
    );

    tempLogData.produktmerkmaleMitScore = sortedResult.slice(0, 10);
    return sortedResult;
}
