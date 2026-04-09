'use client'

import React, { useState } from 'react';
import FormStepper from './stepper/form-stepper';
import PersonalData from './steps/personal-data/personal-data';
import './scholarship-form.css';

const ScholarshipForm = () => {
    const [activeStep, setActiveStep] = useState(0);
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
        if (confirm('Are you sure you want to cancel? Your progress may be lost.')) {
            window.location.href = '/'; // Or wherever a cancel should go
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <PersonalData 
                        onContinue={handleContinue} 
                        onBack={handleBack} 
                        onCancel={handleCancel}
                        savedData={formData.personal}
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
        </div>
    );
};

export default ScholarshipForm;
