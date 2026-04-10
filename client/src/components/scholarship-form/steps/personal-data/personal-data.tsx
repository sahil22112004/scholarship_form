'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
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
import { personalSchema, personalInterface } from '../../../validation/personalSchema';
import './personal-data.css';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hook';
import { createPersonalDetailThunk } from '@/store/features/scholarshipform/scholarshipform-api';


interface PersonalDataProps {
    onContinue: (data: any) => void;
    onBack: () => void;
    savedData?: any;
    setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
    cancelModal: boolean
}

const PersonalData: React.FC<PersonalDataProps> = ({ onContinue, onBack, setCancelModal, cancelModal, savedData }) => {
    const dispatch = useAppDispatch();
    const { ScholarshipForm, PersonalDetail } = useAppSelector((state) => state.scholarshipform)
    console.log("personak data is ", PersonalDetail)




    const { control, handleSubmit, setValue, watch, reset, getValues, formState: { errors } } = useForm<personalInterface>({
        resolver: zodResolver(personalSchema),
        defaultValues: PersonalDetail || savedData || {
            documentType: '',
            documentNumber: '',
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
    const selectedCountry = watch('country');
    const selectedState = watch('state');

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);


    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (PersonalDetail && !savedData) {
            reset(PersonalDetail);
        }
    }, [PersonalDetail, savedData, reset]);

    useEffect(() => {
        if (selectedCountry) {
            const statesData = State.getStatesOfCountry(selectedCountry);
            setStates(statesData);

            // Only clear state/city if the current values are not valid for this country
            const currentState = getValues('state');
            if (currentState && !statesData.find(s => s.isoCode === currentState)) {
                setValue('state', '');
                setValue('city', '');
                setCities([]);
            }
        } else {
            setStates([]);
            setCities([]);
        }
    }, [selectedCountry, setValue, getValues]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const citiesData = City.getCitiesOfState(selectedCountry, selectedState);
            setCities(citiesData);

            // Only clear city if the current value is not valid for this state
            const currentCity = getValues('city');
            if (currentCity && !citiesData.find(c => c.name === currentCity)) {
                setValue('city', '');
            }
        } else {
            setCities([]);
        }
    }, [selectedCountry, selectedState, setValue, getValues]);



    const onSubmit = (data: any) => {
        if (!ScholarshipForm) {
            console.log('no application selected ')
            return
        }
        const content = {
            application_uuid: ScholarshipForm.id,
            content: data
        }
        dispatch(createPersonalDetailThunk(content))

        console.log(data)
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
                    <div className="form-col" style={{ maxWidth: '49.5%' }}>
                        <Controller
                            name="profession"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Profession / Occupation"
                                    placeholder="Enter profession"
                                    variant="outlined"
                                    className="linkedin-input-container"
                                    error={!!errors.profession}
                                    helperText={errors.profession?.message as string}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                                        field.onChange(value);
                                    }}
                                />
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
                                                className: "linkedin-input-container dob-field",
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
                                        {countries.map((c) => (
                                            <MenuItem key={c.isoCode} value={c.isoCode}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
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
                                        disabled={!selectedCountry}
                                    >
                                        {states.map((s) => (
                                            <MenuItem key={s.isoCode} value={s.isoCode}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
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
                                        disabled={!selectedState}
                                    >
                                        {cities.map((c) => (
                                            <MenuItem key={c.name} value={c.name}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
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
                                        {countries.map((c) => (
                                            <MenuItem key={c.isoCode} value={c.isoCode}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                        {/* <MenuItem value="Nationality 1">Nationality 1</MenuItem> */}
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
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9.,]/g, '');
                                        field.onChange(value);
                                    }}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton size="small">
                                                        <Tooltip
                                                            title="Estimated monthly income of the household">
                                                            <HelpOutlineOutlinedIcon fontSize="small" sx={{ color: '#9E9E9E' }} />
                                                        </Tooltip>
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
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9.,]/g, '');
                                        field.onChange(value);
                                    }}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton size="small">
                                                        <Tooltip
                                                            title="Estimated monthly expense of the household">
                                                            <HelpOutlineOutlinedIcon fontSize="small" sx={{ color: '#9E9E9E' }} />
                                                        </Tooltip>
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
                                            helperText={errors.children0to4?.message as string}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                field.onChange(value);
                                            }}
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
                                            helperText={errors.children5to12?.message as string}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                field.onChange(value);
                                            }}
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
                                            helperText={errors.children13to18?.message as string}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                field.onChange(value);
                                            }}
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
                                            helperText={errors.children18plus?.message as string}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                field.onChange(value);
                                            }}
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
                    <button type="button" className="btn-secondary" onClick={() => setCancelModal(true)}>CANCEL</button>
                    <button type="submit" className="btn-primary">CONTINUE</button>
                </div>
            </div>
        </form>
    );
};

export default PersonalData;
