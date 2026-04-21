import type { Produkt, ProduktEmpfehlung } from '@/models/produkt.types';
import styles from './Recommendation.module.css';

export interface RecommendationProps {
    produktempfehlungen: ProduktEmpfehlung[];
}

export const Recommendation = ({ produktempfehlungen }: RecommendationProps) => {
    return (
        <>
            <div className="group-title">Empfohlene Ausrüstung</div>

            {produktempfehlungen.slice(0, 3).map(({ produkt, score, relevanteMerkmale }, index) => (
                <ProductCard
                    key={produkt.id}
                    name={produkt.name}
                    kategorie={produkt.kategorie}
                    imageUrl={produkt.imageUrl}
                    ranking={index + 1}
                    score={score}
                    // kritischesMerkmal={`${relevanteMerkmale[0].produktmerkmal}`}
                    kritischesMerkmal={`${relevanteMerkmale[0]?.produktmerkmal}: ${relevanteMerkmale[0]?.relevanteBeduerfnisse.map((b) => `${b.beduerfnis}`).join(', ')}`}
                />
            ))}

            <div className={styles.summaryBar}>
                <div className={styles.summaryGrid}>
                    <div>
                        <div className={styles.priceLabel}>Ausrüstungswert insgesamt</div>
                        <div className={styles.priceValue}>
                            {produktempfehlungen
                                .reduce((gesamtpreis, empfehlung) => gesamtpreis + empfehlung.produkt.preis, 0)
                                .toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                        </div>
                    </div>
                    <button className={styles.btnView}>
                        Ausrüstung merken
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
                <div
                    style={{
                        marginTop: '16px',
                        fontSize: '11px',
                        color: '#a0b37e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a0b37e' }}></div>
                    Konfidenzwert: {'<TODO>'}% Match
                </div>
            </div>
        </>
    );
};

interface ProductCardProps extends Partial<Produkt> {
    ranking: number;
    score: number;
    kritischesMerkmal: string;
}

const ProductCard = ({ name, kategorie, imageUrl, ranking, score, kritischesMerkmal }: ProductCardProps) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productRelevance}>
                <div className={styles.ProduktRank}>{`${ranking}.`}</div>
                <div className={styles.ProduktScore}>{`${score.toFixed(2).replace('.', ',')}`}</div>
            </div>
            <div className={styles.productImage}>
                {imageUrl ? (
                    <img src={`/images/products/${imageUrl}`} />
                ) : (
                    <div style={{ color: 'var(--text-muted)' }}>BILD</div>
                )}
            </div>
            <div className={styles.productContent}>
                <span className={styles.productCategory}>{kategorie}</span>
                <span className={styles.productName}>{name}</span>
                <div className={styles.badgeConfidence}>{kritischesMerkmal}</div>
                {/* <div className={styles.badgeConfidence} style={{ display: 'flex' }}>
                    <span>{kritischesMerkmal}</span>
                    <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>{` ➔ Score ${score.toFixed(2)}`}</span>
                </div>*/}
            </div>
        </div>
    );
};
