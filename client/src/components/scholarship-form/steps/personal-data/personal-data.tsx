'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
    IconButton,
} from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { personalSchema } from '../../../validation/personalSchema';
import './personal-data.css';

interface PersonalDataProps {
    onContinue: (data: any) => void;
    onBack: () => void;
    onCancel: () => void;
    savedData?: any;
}

const PersonalData: React.FC<PersonalDataProps> = ({ onContinue, onBack, onCancel, savedData }) => {
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(personalSchema),
        defaultValues: savedData || {
            documentType: '',
            documentNumber: '',
            gender: '',
            maritalStatus: '',
            profession: '',
            dob: '',
            country: '',
            state: '',
            city: '',
            nationality: '',
            income: '',
            expense: '',
            dependent: 'no',
            hasChildren: 'no',
            children0to4: '',
            children5to12: '',
            children13to18: '',
            children18plus: ''
        }
    });

    const hasChildren = watch('hasChildren');

    const onSubmit = (data: any) => {
        onContinue(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="personal-form">
            <div className="form-header">
                <h2>Personal data</h2>
            </div>

            <div className="form-section">
                <div className="section-title">1. Basic data</div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="documentType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.documentType} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="document-type-label">Type of document</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="document-type-label"
                                        id="document-type-select"
                                        label="Type of document"
                                    >
                                        <MenuItem value="National identity card">National identity card</MenuItem>
                                        <MenuItem value="Passport">Passport</MenuItem>
                                        <MenuItem value="Foreigner's identity card">Foreigner's identity card</MenuItem>
                                        <MenuItem value="RUC">RUC</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    {errors.documentType && <FormHelperText>{errors.documentType.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="form-col">
                        <Controller
                            name="documentNumber"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="document-number-input"
                                    fullWidth
                                    label="Document number"
                                    placeholder="Enter document number"
                                    variant="outlined"
                                    className="linkedin-input-container"
                                    error={!!errors.documentNumber}
                                    helperText={errors.documentNumber?.message as string}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.gender} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="gender-label"
                                        id="gender-select"
                                        label="Gender"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Non-binary">Non-binary</MenuItem>
                                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                                    </Select>
                                    {errors.gender && <FormHelperText>{errors.gender.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="form-col">
                        <Controller
                            name="maritalStatus"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.maritalStatus} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="marital-status-label">Marital status</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="marital-status-label"
                                        id="marital-status-select"
                                        label="Marital status"
                                    >
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                        <MenuItem value="Widowed">Widowed</MenuItem>
                                        <MenuItem value="Separated">Separated</MenuItem>
                                    </Select>
                                    {errors.maritalStatus && <FormHelperText>{errors.maritalStatus.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col" style={{ maxWidth: '49.5%' }}>
                        <Controller
                            name="profession"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.profession} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="profession-label">Profession / Occupation</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="profession-label"
                                        id="profession-select"
                                        label="Profession / Occupation"
                                    >
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Employed">Employed</MenuItem>
                                        <MenuItem value="Self-employed">Self-employed</MenuItem>
                                        <MenuItem value="Unemployed">Unemployed</MenuItem>
                                        <MenuItem value="Retired">Retired</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    {errors.profession && <FormHelperText>{errors.profession.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="section-title">2. Birth data</div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field: { onChange, value, ...restField } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateField']} sx={{ pt: 0 }}>
                                        <DateField
                                            {...restField}
                                            label="Date of birth"
                                            value={value ? dayjs(value) : null}
                                            onChange={(newValue) => {
                                                onChange(newValue ? (newValue as any).format('YYYY-MM-DD') : '');
                                            }}
                                            format="DD/MM/YYYY"
                                            slotProps={{
                                                textField: {
                                                    error: !!errors.dob,
                                                    helperText: errors.dob?.message as string,
                                                    fullWidth: true,
                                                    variant: 'outlined',
                                                    className: "linkedin-input-container",
                                                    slotProps: {
                                                        input: {
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <CalendarTodayOutlinedIcon sx={{ color: '#777676', fontSize: '18px' }} />
                                                                </InputAdornment>
                                                            ),
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            )}
                        />
                    </div>
                    <div className="form-col">
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.country} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="country-label"
                                        id="country-select"
                                        label="Country"
                                    >
                                        <MenuItem value="Country 1">Country 1</MenuItem>
                                        <MenuItem value="Country 2">Country 2</MenuItem>
                                    </Select>
                                    {errors.country && <FormHelperText>{errors.country.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.state} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="state-label">Province/State</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="state-label"
                                        id="state-select"
                                        label="Province/State"
                                    >
                                        <MenuItem value="State 1">State 1</MenuItem>
                                    </Select>
                                    {errors.state && <FormHelperText>{errors.state.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="form-col">
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.city} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="city-label">City</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="city-label"
                                        id="city-select"
                                        label="City"
                                    >
                                        <MenuItem value="City 1">City 1</MenuItem>
                                    </Select>
                                    {errors.city && <FormHelperText>{errors.city.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col" style={{ maxWidth: '49.5%' }}>
                        <Controller
                            name="nationality"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.nationality} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="nationality-label">Nationality</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="nationality-label"
                                        id="nationality-select"
                                        label="Nationality"
                                    >
                                        <MenuItem value="Nationality 1">Nationality 1</MenuItem>
                                    </Select>
                                    {errors.nationality && <FormHelperText>{errors.nationality.message as string}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="section-title">3. Financial data</div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="income"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Monthly income"
                                    placeholder="Enter monthly income"
                                    variant="outlined"
                                    className="linkedin-input-container"
                                    error={!!errors.income}
                                    helperText={errors.income?.message as string}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton size="small">
                                                        <HelpOutlineOutlinedIcon fontSize="small" sx={{ color: '#9E9E9E' }} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="form-col">
                        <Controller
                            name="expense"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Monthly expense"
                                    placeholder="Enter monthly expense"
                                    variant="outlined"
                                    className="linkedin-input-container"
                                    error={!!errors.expense}
                                    helperText={errors.expense?.message as string}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton size="small">
                                                        <HelpOutlineOutlinedIcon fontSize="small" sx={{ color: '#9E9E9E' }} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="radio-question-text">
                    You are financially dependent on your parents or others:
                </div>
                <Controller
                    name="dependent"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} row className="custom-radio-group">
                            <FormControlLabel value="yes" control={<Radio />} label="YES" />
                            <FormControlLabel value="no" control={<Radio />} label="NO" />
                        </RadioGroup>
                    )}
                />
            </div>

            <div className="form-section">
                <div className="section-title">4. Family data</div>
                <div className="radio-question-text" style={{ marginTop: 0 }}>
                    Has children:
                </div>
                <Controller
                    name="hasChildren"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} row className="custom-radio-group">
                            <FormControlLabel value="yes" control={<Radio />} label="YES" />
                            <FormControlLabel value="no" control={<Radio />} label="NO" />
                        </RadioGroup>
                    )}
                />

                {hasChildren === 'yes' && (
                    <div className="children-count-container">
                        <div className="radio-question-text" style={{ marginBottom: 15, marginTop: 25 }}>Number of children by age:</div>
                        <div className="children-grid">
                            <div className="children-grid-item">
                                <Controller
                                    name="children0to4"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="0 to 4 years"
                                            placeholder="Enter count"
                                            variant="outlined"
                                            className="linkedin-input-container"
                                            error={!!errors.children0to4}
                                        />
                                    )}
                                />
                            </div>
                            <div className="children-grid-item">
                                <Controller
                                    name="children5to12"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="5 to 12 years"
                                            placeholder="Enter count"
                                            variant="outlined"
                                            className="linkedin-input-container"
                                            error={!!errors.children5to12}
                                        />
                                    )}
                                />
                            </div>
                            <div className="children-grid-item">
                                <Controller
                                    name="children13to18"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="13 to 18 years"
                                            placeholder="Enter count"
                                            variant="outlined"
                                            className="linkedin-input-container"
                                            error={!!errors.children13to18}
                                        />
                                    )}
                                />
                            </div>
                            <div className="children-grid-item">
                                <Controller
                                    name="children18plus"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="+ 18 years"
                                            placeholder="Enter count"
                                            variant="outlined"
                                            className="linkedin-input-container"
                                            error={!!errors.children18plus}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        {errors.root && <div className="zod-error-message">{errors.root.message}</div>}
                    </div>
                )}
            </div>

            <div className="personal-form-footer">
                <button type="button" className="btn-secondary" onClick={onBack}>BACK</button>
                <div className="footer-actions-right">
                    <button type="button" className="btn-secondary" onClick={onCancel}>CANCEL</button>
                    <button type="submit" className="btn-primary">CONTINUE</button>
                </div>
            </div>
        </form>
    );
};

export default PersonalData;
