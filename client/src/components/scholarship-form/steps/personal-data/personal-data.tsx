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
import { personalSchema, personalInterface } from '../../validation/personalSchema';
import './personal-data.css';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hook';
import { createPersonalDetailThunk } from '@/store/features/scholarshipform/scholarshipform-api';
import { useTranslation } from 'react-i18next';


interface PersonalDataProps {
    onContinue: (data: any) => void;
    onBack: () => void;
    setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
    cancelModal: boolean
}

const PersonalData = ({ onContinue, onBack, setCancelModal, cancelModal }:PersonalDataProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { ScholarshipForm, PersonalDetail } = useAppSelector((state) => state.scholarshipform)
    console.log("personak data is ", PersonalDetail)




    const { control, handleSubmit, setValue, watch, reset, getValues, formState: { errors } } = useForm<personalInterface>({
        resolver: zodResolver(personalSchema(t)),
        defaultValues: PersonalDetail || {
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
        if (PersonalDetail) {
            reset(PersonalDetail);
        }
    }, [PersonalDetail, reset]);

    useEffect(() => {
        if (selectedCountry) {
            const statesData = State.getStatesOfCountry(selectedCountry);
            setStates(statesData);

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
                <h2>{t("personalData.title")}</h2>
            </div>

            <div className="form-section">
                <div className="section-title">{t("personalData.sections.basic")}</div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="documentType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.documentType} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="document-type-label">{t("personalData.fields.documentType")}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="document-type-label"
                                        id="document-type-select"
                                        label={t("personalData.fields.documentType")}
                                    >
                                        <MenuItem value="National identity card">{t("personalData.options.documentType.nic")}</MenuItem>
                                        <MenuItem value="Passport">{t("personalData.options.documentType.passport")}</MenuItem>
                                        <MenuItem value="Foreigner's identity card">{t("personalData.options.documentType.foreigner")}</MenuItem>
                                        <MenuItem value="RUC">{t("personalData.options.documentType.ruc")}</MenuItem>
                                        <MenuItem value="Other">{t("personalData.options.documentType.other")}</MenuItem>
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
                                    label={t("personalData.fields.documentNumber")}
                                    placeholder={t("personalData.fields.documentNumberPlaceholder")}
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
                                    <InputLabel id="marital-status-label">{t("personalData.fields.maritalStatus")}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="marital-status-label"
                                        id="marital-status-select"
                                        label={t("personalData.fields.maritalStatus")}
                                    >
                                        <MenuItem value="Married">{t("personalData.options.maritalStatus.married")}</MenuItem>
                                        <MenuItem value="Single">{t("personalData.options.maritalStatus.single")}</MenuItem>
                                        <MenuItem value="Divorced">{t("personalData.options.maritalStatus.divorced")}</MenuItem>
                                        <MenuItem value="Widowed">{t("personalData.options.maritalStatus.widowed")}</MenuItem>
                                        <MenuItem value="Separated">{t("personalData.options.maritalStatus.separated")}</MenuItem>
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
                                    label={t("personalData.fields.profession")}
                                    placeholder={t("personalData.fields.professionPlaceholder")}
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
                <div className="section-title">{t("personalData.sections.birth")}</div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field: { onChange, value, ...restField } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField
                                        {...restField}
                                        label={t("personalData.fields.dob")}
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
                                                className: "dob-input-container dob-field",
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
                                    <InputLabel id="country-label">{t("personalData.fields.country")}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="country-label"
                                        id="country-select"
                                        label={t("personalData.fields.country")}
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
                                    <InputLabel id="state-label">{t("personalData.fields.state")}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="state-label"
                                        id="state-select"
                                        label={t("personalData.fields.state")}
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
                                    <InputLabel id="city-label">{t("personalData.fields.city")}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="city-label"
                                        id="city-select"
                                        label={t("personalData.fields.city")}
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
                    <div className="form-col" style={{ maxWidth: '49%' }}>
                        <Controller
                            name="nationality"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.nationality} variant="outlined" className="linkedin-input-container">
                                    <InputLabel id="nationality-label">{t("personalData.fields.nationality")}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="nationality-label"
                                        id="nationality-select"
                                        label={t("personalData.fields.nationality")}
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
                <div className="section-title">{t("personalData.sections.financial")}</div>
                <div className="form-row">
                    <div className="form-col">
                        <Controller
                            name="income"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={t("personalData.fields.income")}
                                    placeholder={t("personalData.fields.incomePlaceholder")}
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
                                                            title={t("personalData.financial.incomeTooltip")}>
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
                                    label={t("personalData.fields.expense")}
                                    placeholder={t("personalData.fields.expensePlaceholder")}
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
                                                            title={t("personalData.financial.expenseTooltip")}>
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
               </div>

                <div className="form-section">
                <div className="radio-question-text">
                    {t("personalData.financial.dependent")}
                </div>
                <Controller
                    name="dependent"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} row className="custom-radio-group">
                            <FormControlLabel value="yes" control={<Radio />} label={t("personalData.options.yes")} />
                            <FormControlLabel value="no" control={<Radio />} label={t("personalData.options.no")} />
                        </RadioGroup>
                    )}
                />
            </div>

            <div className="form-section">
                <div className="section-title">{t("personalData.sections.family")}</div>
                <div className="radio-question-text" style={{ marginTop: 0 }}>
                    {t("personalData.family.hasChildren")}
                </div>
                <Controller
                    name="hasChildren"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup {...field} row className="custom-radio-group">
                            <FormControlLabel value="yes" control={<Radio />} label={t("personalData.options.yes")} />
                            <FormControlLabel value="no" control={<Radio />} label={t("personalData.options.no")} />
                        </RadioGroup>
                    )}
                />

                {hasChildren === 'yes' && (
                    <div className="children-count-container">
                        <div className="radio-question-text" style={{ marginBottom: 15, marginTop: 25 }}>{t("personalData.family.childrenCount")}</div>
                        <div className="children-grid">
                            <div className="children-grid-item">
                                <Controller
                                    name="children0to4"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label={t("personalData.family.ageGroups.0to4")}
                                            placeholder={t("personalData.family.childrenPlaceholder")}
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
                                            label={t("personalData.family.ageGroups.5to12")}
                                            placeholder={t("personalData.family.childrenPlaceholder")}
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
                                            label={t("personalData.family.ageGroups.13to18")}
                                            placeholder={t("personalData.family.childrenPlaceholder")}
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
                                            label={t("personalData.family.ageGroups.18plus")}
                                            placeholder={t("personalData.family.childrenPlaceholder")}
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
                <button type="button" className="btn-secondary" onClick={onBack}>{t("personalData.buttons.back")}</button>
                <div className="footer-actions-right">
                    <button type="button" className="btn-secondary" onClick={() => setCancelModal(true)}>{t("personalData.buttons.cancel")}</button>
                    <button type="submit" className="btn-primary">{t("personalData.buttons.continue")}</button>
                </div>
            </div>
        </form>
    );
};

export default PersonalData;
