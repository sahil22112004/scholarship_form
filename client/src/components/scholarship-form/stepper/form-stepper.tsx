'use client'

import React from 'react'
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material'
import './form-stepper.css'
import { useTranslation } from 'react-i18next';



function CustomStepIcon(props: { active?: boolean; completed?: boolean; icon: React.ReactNode }) {
  const { active, completed, icon } = props

  return (
    <div
      className={`step-icon ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
    >
      {icon}
    </div>
  )
}

interface FormStepperProps {
  activeStep: number
  onStepClick?: (step: number) => void
}

const FormStepper = ({ activeStep, onStepClick }: FormStepperProps) => {
  const { t } = useTranslation()

  const steps = [
    t('formStepper.steps.personal'),
    t('formStepper.steps.addresses'),
    t('formStepper.steps.academic'),
    t('formStepper.steps.labor'),
    t('formStepper.steps.references'),
    t('formStepper.steps.documents'),
    t('formStepper.steps.Additional')
  ]

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      connector={<StepConnector className="custom-connector" />}
      className="stepper-root"
    >
      {steps.map((label, index) => (
        <Step
          key={label}
          onClick={() => onStepClick?.(index)}
          className="step-item"
        >
          <StepLabel
            slots={{ stepIcon: CustomStepIcon }}
            className={`step-label ${activeStep === index ? 'active-label' : ''}`}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default FormStepper