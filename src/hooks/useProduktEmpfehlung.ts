import { useMemo } from 'react';

import type { Nutzungskontext } from '@/models/nutzungskontext.types';
import type { Produkt, ProduktEmpfehlung } from '@/models/produkt.types';

import { kontextRegeln } from '@/rules/kontextRegeln';
import { beduerfnisToProduktmerkmalMapping } from '@/rules/beduerfnisToProduktmerkmalMapping';

import { ermittleBeduerfnisse } from '@/logic/ermittleBeduerfnisse';
import { ermittleProduktmerkmale } from '@/logic/ermittleProduktmerkmale';
import { filterProdukteNachMerkmalen } from '@/logic/filterProdukteNachMerkmalen';

export function useProduktEmpfehlung(nutzungskontext: Nutzungskontext, produkte: Produkt[]): ProduktEmpfehlung[] {
    return useMemo(() => {
        if (!nutzungskontext) return [];
        const beduerfnisseGewichtet = ermittleBeduerfnisse(nutzungskontext, kontextRegeln);
        const produktmerkmale = ermittleProduktmerkmale(beduerfnisseGewichtet, beduerfnisToProduktmerkmalMapping);
        const empfehlungen = filterProdukteNachMerkmalen(produkte, produktmerkmale);
        return empfehlungen;
    }, [nutzungskontext, produkte]);
}
