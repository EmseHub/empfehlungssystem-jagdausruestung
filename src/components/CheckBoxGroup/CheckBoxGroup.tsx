import type { AuspraegungOption } from '@/models/nutzungskontext.types';
import styles from './CheckBoxGroup.module.css';

export interface Props {
    title: string;
    options: AuspraegungOption[];
    selection: AuspraegungOption[];
    onSelectionChange: (selection: AuspraegungOption[]) => void;
}

export const CheckBoxGroup = ({ title, options, selection, onSelectionChange }: Props) => {
    const toggle = (option: AuspraegungOption) => {
        const next = selection.some((s) => s.key === option.key)
            ? selection.filter((s) => s.key !== option.key)
            : [...selection, option];

        onSelectionChange(next);
    };

    return (
        <div className="group-container">
            <div className="group-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
                {title} <span className={styles.optionalTag}>Optional</span>
            </div>

            <div className={styles.checkBoxGroup}>
                {options.map((option) => {
                    const isSelected = selection.some((o) => o.key === option.key);
                    return (
                        <div
                            key={option.key}
                            className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                            onClick={() => toggle(option)}
                        >
                            <div className={styles.iconBox}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span>{option.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
