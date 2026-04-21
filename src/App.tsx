import { useState } from 'react';
// import { Button } from '@/components/ui/button';

import { DUMMY_DATA_PRODUKTE } from '@/data/produkte';
import { useProduktEmpfehlung } from '@/hooks/useProduktEmpfehlung';

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
import { Recommendation } from './components/Recommendation';
import type { BeduerfnisMitScore } from './models/beduerfnis.types';
import type { ProduktmerkmalMitScore } from './models/produkt.types';

export const tempLogData: {
    beduerfnisseMitScore: BeduerfnisMitScore[];
    produktmerkmaleMitScore: ProduktmerkmalMitScore[];
} = {
    beduerfnisseMitScore: [],
    produktmerkmaleMitScore: [],
};

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

    const produktempfehlungen = useProduktEmpfehlung(nutzungskontext, DUMMY_DATA_PRODUKTE);

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
            <header>
                <img
                    src="/images/logo/ADURO_white_on_black.png"
                    style={{ height: '30px', width: 'auto', alignSelf: 'center', cursor: 'pointer' }}
                    alt="ADURO Logo"
                    onClick={() => {
                        const logBox = document.getElementById('logBox');
                        if (logBox) {
                            logBox.style.display === 'none'
                                ? (logBox.style.display = 'block')
                                : (logBox.style.display = 'none');
                        }
                    }}
                />
            </header>
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
                <div className="recommendation-pane">
                    <Recommendation produktempfehlungen={produktempfehlungen} />
                </div>
            </main>
            <LogBox />
        </>
    );
}

export default App;

const LogBox = () => {
    if (tempLogData.beduerfnisseMitScore.length === 0 && tempLogData.produktmerkmaleMitScore.length === 0) {
        return null;
    }

    return (
        <div
            id="logBox"
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                backgroundColor: 'rgba(0,0,0,0.9)',
                color: '#4a5d23',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '10px',
                whiteSpace: 'pre-wrap',
                zIndex: 1000,
                pointerEvents: 'none',
                display: 'flex',
            }}
        >
            <div>
                <strong>Bedürfnisse</strong>
                <br />
                {tempLogData.beduerfnisseMitScore
                    .map((item, index) => `${index + 1}. ${item.beduerfnis}: ${item.score.toFixed(2)}`)
                    .join('\n')}
            </div>
            <div style={{ marginLeft: '12px' }}>
                <strong>Produktmerkmale</strong>
                <br />
                {tempLogData.produktmerkmaleMitScore
                    .map((item, index) => `${index + 1}. ${item.produktmerkmal}: ${item.score.toFixed(2)}`)
                    .join('\n')}
            </div>
        </div>
    );
};

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
