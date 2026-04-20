import type { Produkt, ProduktEmpfehlung, ProduktmerkmalMitScore } from '@/models/produkt.types';

export function filterProdukteNachMerkmalen(
    produkte: Produkt[],
    produktmerkmaleMitScore: ProduktmerkmalMitScore[]
): ProduktEmpfehlung[] {
    return produkte
        .map((produkt) => {
            let score = 0;
            const relevanteMerkmale: ProduktmerkmalMitScore[] = [];

            for (const merkmalMitScore of produktmerkmaleMitScore) {
                if (produkt.produktmerkmale.includes(merkmalMitScore.produktmerkmal)) {
                    score += merkmalMitScore.score;
                    relevanteMerkmale.push(merkmalMitScore);
                }
            }

            return {
                produkt,
                score,
                relevanteMerkmale,
            };
        })
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score);
}
