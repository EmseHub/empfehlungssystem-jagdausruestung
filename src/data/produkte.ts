import type { Produkt } from '@/models/produkt.types';

export const DUMMY_DATA_PRODUKTE: Produkt[] = [
    {
        id: '1',
        name: 'Wasserdichte Jagdweste',
        kategorie: 'Weste',
        produktmerkmale: ['GoreTexMembran', 'VerstaerkteNaehte'],
        preis: 99.99,
        imageUrl: 'weste_protect.jpg',
    },
    {
        id: '2',
        name: 'Leichte Jagdhose',
        kategorie: 'Hose',
        produktmerkmale: ['StretchMaterial', 'Leichtgewicht'],
        preis: 99.99,
        imageUrl: 'Sau-Protect-Profi-scaled.jpeg',
    },
    {
        id: '3',
        name: 'Camouflage Cap',
        kategorie: 'Zubehoer',
        produktmerkmale: ['Camouflage', 'GrosseTaschen'],
        preis: 99.99,
        imageUrl: '336895-Freigabeabbildung-3-19-12-22-1-scaled-2.png',
    },
    {
        id: '4',
        name: 'Signalorange Jacke',
        kategorie: 'Jacke',
        produktmerkmale: ['Signalorange', 'Reflektoren'],
        preis: 999.99,
        imageUrl: 'Aduro-Hundefuehrerjacke-1.jpg',
    },
    {
        id: '5',
        name: 'ADURO Softshelljacke',
        kategorie: 'Jacke',
        produktmerkmale: ['Softshell', 'Leichtgewicht'],
        preis: 99.99,
        imageUrl: 'ADURO-Softshelljacke-Logo-weiss.png',
    },
];
