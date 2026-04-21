import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { DUMMY_DATA_PRODUKTE } from '@/data/produkte';

import {
    DIMENSIONEN,
    type AuspraegungKey,
    type AuspraegungOption,
    type AuspraegungValue,
    type Dimensionen,
    type DimensionKey,
    type Nutzungskontext,
    type NutzungskontextKey,
} from '@/models/nutzungskontext.types';

import { kontextRegeln } from '@/rules/kontextRegeln';
import { beduerfnisToProduktmerkmalMapping } from '@/rules/beduerfnisToProduktmerkmalMapping';

import { ermittleBeduerfnisse } from '@/logic/ermittleBeduerfnisse';
import { ermittleProduktmerkmale } from '@/logic/ermittleProduktmerkmale';
import { filterProdukteNachMerkmalen } from '@/logic/filterProdukteNachMerkmalen';

import { CheckBoxGroup } from './components/CheckBoxGroup';
import { RadioButtonGroup } from './components/RadioButtonGroup';

export function App() {
    const [nutzungskontext, setNutzungskontext] = useState<Nutzungskontext>({
        terrain: [DIMENSIONEN.TERRAIN.AUSPRAEGUNGEN.SUMPF],
        niederschlag: DIMENSIONEN.NIEDERSCHLAG.AUSPRAEGUNGEN.STARKER_REGEN,
        temperatur: DIMENSIONEN.TEMPERATUR.AUSPRAEGUNGEN.KUEHL,
        sonneneinstrahlung: DIMENSIONEN.SONNENEINSTRAHLUNG.AUSPRAEGUNGEN.MITTEL,
        windstaerke: DIMENSIONEN.WINDSTAERKE.AUSPRAEGUNGEN.MAESSIG,
        luftfeuchtigkeit: DIMENSIONEN.LUFTFEUCHTIGKEIT.AUSPRAEGUNGEN.FEUCHT,
        tageszeit: DIMENSIONEN.TAGESZEIT.AUSPRAEGUNGEN.TAG,
        jagdart: [DIMENSIONEN.JAGDART.AUSPRAEGUNGEN.DRUECKJAGD],
        rolle: [DIMENSIONEN.ROLLE.AUSPRAEGUNGEN.SCHUETZE],
        erfahrung: DIMENSIONEN.ERFAHRUNG.AUSPRAEGUNGEN.ANFAENGER,
        jagdhaeufigkeit: DIMENSIONEN.JAGDHAEUFIGKEIT.AUSPRAEGUNGEN.MITTEL,
    });

    const handleSelectionChange = (
        nutzungskontextKey: NutzungskontextKey,
        auspraegungen: AuspraegungValue | AuspraegungValue[]
    ) => {
        setNutzungskontext((prev) => ({
            ...prev,
            [nutzungskontextKey]: auspraegungen,
        }));
    };

    return (
        <>
            <header></header>
            <main>
                <div className="configurator-pane">
                    <div className="section-header">
                        <h1>Nutzungskontext</h1>
                        <p>Definiere Kontextfaktoren zum Testen des Modells.</p>
                    </div>
                    {(Object.entries(DIMENSIONEN) as [DimensionKey, Dimensionen[DimensionKey]][]).map(
                        ([dimensionKey, dimension]) => {
                            const { MEHRFACHAUSWAHL, TITEL, AUSPRAEGUNGEN } = dimension;

                            const auspraegungenAsArray = Object.entries(AUSPRAEGUNGEN) as [
                                AuspraegungKey,
                                AuspraegungValue,
                            ][];

                            const auspraegungenAsOptions = auspraegungenAsArray.map(
                                ([key, label]): AuspraegungOption => ({ key, label })
                            );

                            const convertAuspraegungValueToOption = (
                                auspraeungValue: AuspraegungValue
                            ): AuspraegungOption => {
                                const match = auspraegungenAsArray.find(([_, value]) => value === auspraeungValue);
                                if (!match) {
                                    return { key: '' as AuspraegungKey, label: '' as AuspraegungValue };
                                }
                                return { key: match[0], label: match[1] };
                            };

                            const nutzungskontextKey = dimensionKey.toLowerCase() as NutzungskontextKey;
                            const curSelectionValues = nutzungskontext[nutzungskontextKey];

                            return MEHRFACHAUSWAHL ? (
                                <CheckBoxGroup
                                    key={dimensionKey}
                                    title={TITEL}
                                    options={auspraegungenAsOptions}
                                    selection={((curSelectionValues as AuspraegungValue[]) || []).map((val) =>
                                        convertAuspraegungValueToOption(val)
                                    )}
                                    onSelectionChange={(selection) => {
                                        handleSelectionChange(
                                            nutzungskontextKey,
                                            selection.map((s) => s.label)
                                        );
                                    }}
                                />
                            ) : (
                                <RadioButtonGroup
                                    key={dimensionKey}
                                    title={TITEL}
                                    options={auspraegungenAsOptions}
                                    selection={
                                        convertAuspraegungValueToOption(curSelectionValues as AuspraegungValue) || null
                                    }
                                    onSelectionChange={(selectedOption) => {
                                        handleSelectionChange(nutzungskontextKey, selectedOption.label);
                                    }}
                                />
                            );
                        }
                    )}
                </div>
                <div className="recommendation-pane"></div>
            </main>
        </>
    );
}

export default App;

(() => {
    return;
    const nutzungskontext: Nutzungskontext = {
        terrain: ['Sumpf'],
        niederschlag: 'Starker Regen',
        temperatur: 'Kühl (5-10°C)',
        sonneneinstrahlung: 'Mittel',
        windstaerke: 'Mäßig',
        luftfeuchtigkeit: 'Feucht',
        tageszeit: 'Tag',
        jagdart: ['Drückjagd'],
        rolle: ['Schütze'],
        erfahrung: 'Anfänger',
        jagdhaeufigkeit: 'Mittel (6-15/Jahr)',
    };

    const beduerfnisseGewichtet = ermittleBeduerfnisse(nutzungskontext, kontextRegeln);

    const produktmerkmale = ermittleProduktmerkmale(beduerfnisseGewichtet, beduerfnisToProduktmerkmalMapping);

    const empfehlungen = filterProdukteNachMerkmalen(DUMMY_DATA_PRODUKTE, produktmerkmale);

    console.log(empfehlungen);
})();
