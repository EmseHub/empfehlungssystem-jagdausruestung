import type { AuspraegungOption } from '@/models/nutzungskontext.types';
import styles from './RadioButtonGroup.module.css';

export interface Props {
    title: string;
    options: AuspraegungOption[];
    selection: AuspraegungOption | null;
    onSelectionChange: (selection: AuspraegungOption) => void;
}

export const RadioButtonGroup = ({ title, options, selection, onSelectionChange }: Props) => {
    return (
        <div className="group-container">
            <div className="group-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                {title} <span className={styles.optionalTag}>Optional</span>
            </div>

            <div className={styles.radioButtonGroup}>
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={`${styles.option} ${selection?.key === option.key ? styles.selected : ''}`}
                        onClick={() => onSelectionChange(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};
