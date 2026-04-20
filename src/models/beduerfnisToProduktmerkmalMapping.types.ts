import type { Beduerfnis } from './beduerfnis.types';
import type { Produktmerkmal } from './produkt.types';

export interface BeduerfnisToProduktmerkmalMapping {
    beduerfnis: Beduerfnis;
    produktmerkmale: Produktmerkmal[];
}
