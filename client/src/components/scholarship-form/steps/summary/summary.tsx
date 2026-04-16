'use client'

import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/use-redux-hook';
import { useTranslation, Trans } from 'react-i18next';
import { 
    Box, 
    Checkbox, 
    FormControlLabel, 
    Typography,
    Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './summary.css';

interface SummaryProps {
    onBack: () => void;
    onSend: () => void;
}

const Summary = ({ onBack, onSend }: SummaryProps) => {
    const { t } = useTranslation();
    const { PersonalDetail, addressDetail, additionalInformation } = useAppSelector((state) => state.scholarshipform);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const renderItem = (label: string, value: string | undefined | null) => (
        <div className="summary-item">
            <div className="summary-label">{label}:</div>
            <div className="summary-value">{value || '-'}</div>
        </div>
    );

    const getDocumentTypeLabel = (type: string | undefined) => {
        if (!type) return '-';
        const keyMap: Record<string, string> = {
            'National identity card': 'nic',
            'Passport': 'passport',
            "Foreigner's identity card": 'foreigner',
            'RUC': 'ruc',
            'Other': 'other'
        };
        return t(`personalData.options.documentType.${keyMap[type] || 'other'}`);
    };

    const getMaritalStatusLabel = (status: string | undefined) => {
        if (!status) return '-';
        return t(`personalData.options.maritalStatus.${status.toLowerCase()}`);
    };

    const getHousingConditionsLabel = (condition: string | undefined) => {
        if (!condition) return '-';
        return t(`addressData.options.housingConditions.${condition.toLowerCase()}`);
    };

    const getHousingTypeLabel = (type: string | undefined) => {
        if (!type) return '-';
        return t(`addressData.options.housingType.${type}`);
    };

    const getAdditionalSourceLabel = (source: string | undefined) => {
        if (!source) return '-';
        return t(`additionalInfo.options.${source}`);
    };

    return (
        <div className="summary-container">
            <div className="summary-top-actions">
                <button className="summary-btn-back-top" onClick={onBack}>
                    <span className="back-arrow"><ArrowBackIcon fontSize='small' /></span> {t('summary.buttons.back')}
                </button>
            </div>
            <div className="summary-header">
                <h2>{t('summary.title')}</h2>
            </div>

            <div className="summary-section">
                <div className="summary-section-title">{t('summary.sections.personal')}</div>
                <div className="summary-card">
                    <div className="summary-sub-section">
                        <div className="summary-sub-section-title">{t('personalData.sections.basic').replace(/^\d+\.\s*/, '')}</div>
                        <div className="summary-grid">
                            {renderItem(t('personalData.fields.documentType'), getDocumentTypeLabel(PersonalDetail?.documentType))}
                            {renderItem(t('personalData.fields.documentNumber'), PersonalDetail?.documentNumber)}
                            {renderItem(t('personalData.fields.maritalStatus'), getMaritalStatusLabel(PersonalDetail?.maritalStatus))}
                            {renderItem(t('personalData.fields.profession'), PersonalDetail?.profession)}
                        </div>
                    </div>

                    <div className="summary-sub-section">
                        <div className="summary-sub-section-title">{t('personalData.sections.birth').replace(/^\d+\.\s*/, '')}</div>
                        <div className="summary-grid">
                            {renderItem(t('personalData.fields.dob'), PersonalDetail?.dob ? new Date(PersonalDetail.dob).toLocaleDateString() : '-')}
                            {renderItem(t('personalData.fields.country'), PersonalDetail?.country)}
                            {renderItem(t('personalData.fields.state'), PersonalDetail?.state)}
                            {renderItem(t('personalData.fields.city'), PersonalDetail?.city)}
                            {renderItem(t('personalData.fields.nationality'), PersonalDetail?.nationality)}
                        </div>
                    </div>

                    <div className="summary-sub-section">
                        <div className="summary-sub-section-title">{t('personalData.sections.financial').replace(/^\d+\.\s*/, '')}</div>
                        <div className="summary-grid">
                            {renderItem(t('personalData.fields.income'), PersonalDetail?.income ? `$${PersonalDetail.income}` : '-')}
                            {renderItem(t('personalData.fields.expense'), PersonalDetail?.expense ? `$${PersonalDetail.expense}` : '-')}
                            {renderItem(t('personalData.financial.dependent'), PersonalDetail?.dependent?.toUpperCase())}
                        </div>
                    </div>

                    <div className="summary-sub-section">
                        <div className="summary-sub-section-title">{t('personalData.sections.family').replace(/^\d+\.\s*/, '')}</div>
                        <div className="summary-item" style={{ marginBottom: '16px' }}>
                            <div className="summary-label">{t('personalData.family.hasChildren')}</div>
                            <div className="summary-value">{PersonalDetail?.hasChildren?.toUpperCase() || '-'}</div>
                        </div>
                        {PersonalDetail?.hasChildren === 'yes' && (
                            <>
                                <div className="summary-child-label" style={{ color: '#757575', fontSize: '13px', marginBottom: '8px' }}>
                                    {t('personalData.family.childrenCount')}
                                </div>
                                <div className="summary-children-grid">
                                    <div className="summary-child-item">
                                        <div className="summary-child-label">{t('personalData.family.ageGroups.0to4')}</div>
                                        <div className="summary-child-value">{PersonalDetail?.children0to4 || '0'}</div>
                                    </div>
                                    <div className="summary-child-item">
                                        <div className="summary-child-label">{t('personalData.family.ageGroups.5to12')}</div>
                                        <div className="summary-child-value">{PersonalDetail?.children5to12 || '0'}</div>
                                    </div>
                                    <div className="summary-child-item">
                                        <div className="summary-child-label">{t('personalData.family.ageGroups.13to18')}</div>
                                        <div className="summary-child-value">{PersonalDetail?.children13to18 || '0'}</div>
                                    </div>
                                    <div className="summary-child-item">
                                        <div className="summary-child-label">{t('personalData.family.ageGroups.18plus')}</div>
                                        <div className="summary-child-value">{PersonalDetail?.children18plus || '0'}</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="summary-section">
                <div className="summary-section-title">{t('summary.sections.addresses')}</div>
                <div className="summary-card">
                    <div className="summary-sub-section">
                        <div className="summary-sub-section-title">{t('addressData.sections.contact').replace(/^\d+\.\s*/, '')}</div>
                        <div className="summary-grid">
                            {renderItem(t('addressData.fields.email'), addressDetail?.emails?.[0]?.email)}
                            {renderItem(t('addressData.fields.phone'), addressDetail?.phones?.find(p => p.type === 'phone')?.number ? `${addressDetail.phones.find(p => p.type === 'phone')?.prefix} ${addressDetail.phones.find(p => p.type === 'phone')?.number}` : '-')}
                            {renderItem(t('addressData.fields.whatsapp'), addressDetail?.phones?.find(p => p.type === 'whatsapp')?.number ? `${addressDetail.phones.find(p => p.type === 'whatsapp')?.prefix} ${addressDetail.phones.find(p => p.type === 'whatsapp')?.number}` : '-')}
                        </div>
                    </div>

                    <div className="summary-sub-section">
                        <div className="summary-sub-section-title">{t('addressData.sections.residence').replace(/^\d+\.\s*/, '')}</div>
                        <div className="summary-grid">
                            {renderItem(t('addressData.fields.housingType'), getHousingTypeLabel(addressDetail?.housingType))}
                            {renderItem(t('addressData.fields.housingConditions'), getHousingConditionsLabel(addressDetail?.housingConditions))}
                            {renderItem(t('addressData.fields.country'), addressDetail?.country)}
                            {renderItem(t('addressData.fields.state'), addressDetail?.state)}
                            {renderItem(t('addressData.fields.city'), addressDetail?.city)}
                            {renderItem(t('addressData.fields.zipCode'), addressDetail?.zipCode)}
                            <div className="summary-item" style={{ gridColumn: 'span 2' }}>
                                <div className="summary-label">{t('addressData.fields.address')}:</div>
                                <div className="summary-value" style={{ fontWeight: 400 }}>{addressDetail?.address || '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="summary-section">
                <div className="summary-section-title">{t('summary.sections.additional')}</div>
                <div className="summary-card">
                    <div className="summary-grid">
                        <div className="summary-item">
                            <div className="summary-label" style={{ width: 'auto', marginRight: '8px' }}>{t('additionalInfo.question')}</div>
                            <div className="summary-value">{getAdditionalSourceLabel(additionalInformation?.source)}</div>
                        </div>
                    </div>
                    {additionalInformation?.specify && (
                        <div className="summary-multiline-item">
                            <div className="summary-multiline-value" style={{ fontWeight: 400 }}>{additionalInformation.specify}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="summary-terms-section">
                <div className="summary-terms-text">
                    <Trans
                        i18nKey="summary.terms.text"
                        components={{ 1: <Link href="#" onClick={(e) => e.preventDefault()} /> }}
                    />
                </div>
                <FormControlLabel
                    className="summary-checkbox-label"
                    control={
                        <Checkbox 
                            checked={acceptedTerms} 
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            sx={{ color: '#9E9E9E', '&.Mui-checked': { color: '#01579B' } }}
                        />
                    }
                    label={t('summary.terms.checkbox')}
                />
            </div>

            <div className="summary-footer">
                <button className="summary-btn-back" onClick={onBack}>
                    {t('summary.buttons.back')}
                </button>
                <button 
                    className="summary-btn-send" 
                    onClick={onSend}
                    disabled={!acceptedTerms}
                >
                    {t('summary.buttons.send')}
                </button>
            </div>
        </div>
    );
};

export default Summary;
