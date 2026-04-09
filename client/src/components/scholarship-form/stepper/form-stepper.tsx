'use client'

import React from 'react'
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material'
import './form-stepper.css'

const steps = [
  'Personal',
  'Addresses',
  'Academic',
  'Labor',
  'References',
  'Documents'
]

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

const FormStepper: React.FC<FormStepperProps> = ({ activeStep, onStepClick }) => {
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