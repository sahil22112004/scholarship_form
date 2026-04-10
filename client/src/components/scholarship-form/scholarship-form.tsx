'use client'

import React, { useEffect, useState } from 'react';
import FormStepper from './stepper/form-stepper';
import PersonalData from './steps/personal-data/personal-data';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box
} from '@mui/material';
import './scholarship-form.css';

const ScholarshipForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [cancelModal, setCancelModal] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        personal: null,
        address: null,
    });

    const handleContinue = (data: any) => {
        console.log('Saving data for step:', activeStep, data);
        setFormData(prev => ({
            ...prev,
            [activeStep === 0 ? 'personal' : 'address']: data
        }));

        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleCancel = () => {
        setCancelModal(true);
    };

    const confirmCancel = () => {
        window.location.href = '/';
    };

    const closeCancelModal = () => {
        setCancelModal(false);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <PersonalData
                        onContinue={handleContinue}
                        onBack={handleBack}
                        savedData={formData.personal}
                        setCancelModal={setCancelModal}
                        cancelModal={cancelModal}

                    />
                );
            case 1:
                return (
                    <div className="placeholder-step">
                        <div className="form-header">
                            <h2>Address data</h2>
                        </div>
                        <p>This section will be detailed in deliverable 2. Currently, it's a placeholder to demonstrate step advancement.</p>
                    </div>
                );
            default:
                return <div>Step {step + 1} content coming soon...</div>;
        }
    };

    return (
        <div className="scholarship-form-container">
            <div className="form-card">
                <div className="form-sidebar">
                    <FormStepper activeStep={activeStep} onStepClick={(step) => setActiveStep(step)} />
                </div>
                <div className="form-content">
                    {renderStepContent(activeStep)}
                </div>
            </div>
            <Dialog
                open={cancelModal}
                onClose={closeCancelModal}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: '12px',
                            padding: '16px 8px 8px 24px',
                            minWidth: '416px'
                        }
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 600, color: 'var(--neutral-neutral-800, #424242)' }}>
                        Cancel Form
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ color: '#5f6368' }}>
                        Are you sure you want to cancel this form?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={closeCancelModal}
                        sx={{
                            color: 'var(--neutral-neutral-800, #424242)',
                            borderRadius: '4px',
                            fontWeight:'600',
                            fontSize:'14px',
                            px: 3,

                        }}
                    >
                        NO
                    </Button>
                    <Button
                        onClick={confirmCancel}
                        sx={{
                            backgroundColor: '#FFF',
                            color: '#01579B',
                            px: 3,
                            fontSize:'14px',
                            fontWeight:'600'
                            
                        }}
                    >
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ScholarshipForm;
