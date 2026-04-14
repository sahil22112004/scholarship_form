'use client'

import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
    Box,
    Typography
} from '@mui/material';
import { Country, State, City } from 'country-state-city';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';


import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hook';
import { addressSchema, addressInterface } from '../../../validation/addressSchema';
import './address.css';
import '../personal-data/personal-data.css';
import { createAddressDetailThunk } from '@/store/features/scholarshipform/scholarshipform-api';

interface AddressProps {
    onContinue: (data: any) => void;
    onBack: () => void;
    savedData?: any;
    setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Address: React.FC<AddressProps> = ({ onContinue, onBack, savedData, setCancelModal }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.auth);
    const { ScholarshipForm, addressDetail } = useAppSelector((state) => state.scholarshipform)



    // Dialog states
    const [addNumberDialogOpen, setAddNumberDialogOpen] = useState(false);
    const [selectedNumberType, setSelectedNumberType] = useState<'phone' | 'whatsapp'>('phone');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteContext, setDeleteContext] = useState<{ type: 'email' | 'phone', index: number } | null>(null);

    const { control, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } = useForm<addressInterface>({
        resolver: zodResolver(addressSchema(t)),
        defaultValues: addressDetail || savedData || {
            emails: [{ email: currentUser?.email || '' }],
            phones: [
                { type: 'phone', prefix: '+91', number: '' },
                { type: 'whatsapp', prefix: '+91', number: '' }
            ],
            housingType: '',
            housingConditions: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            address: ''
        }
    });

    const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
        control,
        name: "emails"
    });

    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: "phones"
    });

    const selectedCountry = watch('country');
    const selectedState = watch('state');

    const [countries] = useState(Country.getAllCountries());
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    useEffect(() => {
        if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            setCities(City.getCitiesOfState(selectedCountry, selectedState));
        } else {
            setCities([]);
        }
    }, [selectedCountry, selectedState]);

    useEffect(() => {
        if (addressDetail && !savedData) {
            reset(addressDetail);
        }
    }, [addressDetail, savedData, reset]);

    const handleAddNumber = () => {
        appendPhone({ type: selectedNumberType, prefix: '+91', number: '' }); 
        setAddNumberDialogOpen(false);
    };

    const confirmDelete = (type: 'email' | 'phone', index: number) => {
        setDeleteContext({ type, index });
        setDeleteConfirmOpen(true);
    };

    const handleDelete = () => {
        if (deleteContext) {
            if (deleteContext.type === 'email') {
                removeEmail(deleteContext.index);
            } else {
                removePhone(deleteContext.index);
            }
        }
        setDeleteConfirmOpen(false);
        setDeleteContext(null);
    };

    const onSubmit = (data: any) => {

        if (!ScholarshipForm) {
            console.log('no application selected ')
            return
        }
        const content = {
            application_uuid: ScholarshipForm.id,
            content: data
        }
        dispatch(createAddressDetailThunk(content))
        console.log("data on address is ", data)
        onContinue(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="address-form">
            <div className="form-header">
                <h2>{t("addressData.title")}</h2>
            </div>

            <div className="form-section">
                <div className="section-title">{t("addressData.sections.contact")}</div>

                <div className="contact-container">

                    <div className="contact-card">
                        <div className="card-header">
                            <span className="card-title">{t("addressData.fields.email")}</span>
                            <Button
                                startIcon={<AddIcon />}
                                className="add-button"
                                onClick={() => appendEmail({ email: '' })}
                            >
                                {t("addressData.buttons.addEmail")}
                            </Button>
                        </div>
                        <div className="field-list">
                            {emailFields.map((field, index) => (
                                <div key={field.id} className="field-row">
                                    <Controller
                                        name={`emails.${index}.email`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                placeholder={t("addressData.placeholders.email")}
                                                variant="outlined"
                                                disabled={index === 0}
                                                error={!!errors.emails?.[index]?.email}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <EmailOutlinedIcon sx={{ color: '#9E9E9E', fontSize: 20 }} />
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: index > 0 ? (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={() => confirmDelete('email', index)} edge="end" sx={{ color: '#757575' }}>
                                                                    <DeleteOutlineOutlinedIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ) : null
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.emails?.[index]?.email && (
                                        <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                                            {errors.emails?.[index]?.email?.message}
                                        </FormHelperText>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contact-card">
                        <div className="card-header">
                            <span className="card-title">{t("addressData.fields.phone")}</span>
                            <Button
                                startIcon={<AddIcon />}
                                className="add-button"
                                onClick={() => setAddNumberDialogOpen(true)}
                            >
                                {t("addressData.buttons.addPhone")}
                            </Button>
                        </div>
                        <div className="field-list">
                            {phoneFields.map((field, index) => (
                                <div key={field.id} className="field-row">
                                    <div className="input-with-delete">
                                        <div className={`phone-field-group ${errors.phones?.[index] ? 'error' : ''}`}>
                                            <div className="prefix-box">
                                                <Controller
                                                    name={`phones.${index}.prefix`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            fullWidth
                                                            variant="outlined"
                                                            renderValue={(value) => {
                                                                const country = countries.find(c => c.phonecode === value.replace('+', ''));
                                                                return (
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                        <span>{country ? country.flag : '🌐'}</span>
                                                                        <Typography variant="body2">{value}</Typography>
                                                                    </Box>
                                                                );
                                                            }}
                                                        >
                                                            {countries.map((c) => (
                                                                <MenuItem key={c.isoCode} value={`+${c.phonecode}`}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <span>{c.flag}</span>
                                                                        <Typography variant="body2">+{c.phonecode} ({c.isoCode})</Typography>
                                                                    </Box>
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                            <div className="number-box">
                                                <Controller
                                                    name={`phones.${index}.number`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            fullWidth
                                                            placeholder={watch(`phones.${index}.type`) === 'phone' ? t("addressData.placeholders.phone") : t("addressData.placeholders.whatsapp")}
                                                            variant="outlined"
                                                            error={!!errors.phones?.[index]?.number}
                                                            slotProps={{
                                                                input: {
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            {watch(`phones.${index}.type`) === 'phone' ?
                                                                                <PhoneIphoneOutlinedIcon sx={{ color: '#9E9E9E', fontSize: 20 }} /> :
                                                                                <WhatsAppIcon sx={{ color: '#9E9E9E', fontSize: 20 }} />
                                                                            }
                                                                        </InputAdornment>
                                                                    ),
                                                                    endAdornment: index > 1 ? (
                                                                        <InputAdornment position="end">
                                                                            <IconButton onClick={() => confirmDelete('phone', index)} edge="end" sx={{ color: '#757575' }}>
                                                                                <DeleteOutlineOutlinedIcon />
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ) : null
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.phones?.[index]?.number && (
                                        <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>
                                            {errors.phones?.[index]?.number?.message}
                                        </FormHelperText>
                                    )}
                                </div>
                            ))}
                        </div>
                        {(errors.phones as any)?.root && (
                            <FormHelperText error sx={{ ml: 2, mb: 1 }}>{(errors.phones as any).root.message}</FormHelperText>
                        )}
                        {(errors.phones as any)?.message && !(errors.phones as any)?.root && (
                            <FormHelperText error sx={{ ml: 2, mb: 1 }}>{(errors.phones as any).message}</FormHelperText>
                        )}
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="section-title">{t("addressData.sections.residence")}</div>
                <div className="residence-grid">
                    <div className="residence-col">
                        <Controller
                            name="housingType"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.housingType}>
                                    <InputLabel>{t("addressData.fields.housingType")}</InputLabel>
                                    <Select {...field} label={t("addressData.fields.housingType")}>
                                        <MenuItem value="House">{t("addressData.options.housingType.House")}</MenuItem>
                                        <MenuItem value="Department">{t("addressData.options.housingType.Department")}</MenuItem>
                                    </Select>
                                    {errors.housingType && <FormHelperText>{errors.housingType.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="residence-col">
                        <Controller
                            name="housingConditions"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.housingConditions}>
                                    <InputLabel>{t("addressData.fields.housingConditions")}</InputLabel>
                                    <Select {...field} label={t("addressData.fields.housingConditions")}>
                                        <MenuItem value="Own">{t("addressData.options.housingConditions.own")}</MenuItem>
                                        <MenuItem value="Rented">{t("addressData.options.housingConditions.rented")}</MenuItem>
                                        <MenuItem value="Family">{t("addressData.options.housingConditions.family")}</MenuItem>
                                    </Select>
                                    {errors.housingConditions && <FormHelperText>{errors.housingConditions.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="residence-col">
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.country}>
                                    <InputLabel>{t("addressData.fields.country")}</InputLabel>
                                    <Select {...field} label={t("addressData.fields.country")}>
                                        {countries.map((c) => (
                                            <MenuItem key={c.isoCode} value={c.isoCode}>{c.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="residence-col">
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.state}>
                                    <InputLabel>{t("addressData.fields.state")}</InputLabel>
                                    <Select {...field} label={t("addressData.fields.state")} disabled={!selectedCountry}>
                                        {states.map((s) => (
                                            <MenuItem key={s.isoCode} value={s.isoCode}>{s.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="residence-col">
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.city}>
                                    <InputLabel>{t("addressData.fields.city")}</InputLabel>
                                    <Select {...field} label={t("addressData.fields.city")} disabled={!selectedState}>
                                        {cities.map((c) => (
                                            <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.city && <FormHelperText>{errors.city.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </div>
                    <div className="residence-col zip-code-col">
                        <Controller
                            name="zipCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={t("addressData.fields.zipCode")}
                                    placeholder={t("addressData.placeholders.zipCode")}
                                    error={!!errors.zipCode}
                                    helperText={errors.zipCode?.message}
                                />
                            )}
                        />
                        <span className="optional-tag">{t("addressData.labels.optional")}</span>
                    </div>
                    <div className="residence-col full-width-row">
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={t("addressData.fields.address")}
                                    placeholder={t("addressData.placeholders.address")}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="address-form-footer">
                <button type="button" className="btn-secondary" onClick={onBack}>{t("personalData.buttons.back")}</button>
                <div className="footer-actions-right">
                    <button type="button" className="btn-secondary" onClick={() => setCancelModal(true)}>{t("personalData.buttons.cancel")}</button>
                    <button type="submit" className="btn-primary">{t("personalData.buttons.continue")}</button>
                </div>
            </div>

            <Dialog open={addNumberDialogOpen} onClose={() => setAddNumberDialogOpen(false)}>
                <DialogTitle sx={{ fontWeight: 600, minWidth: '416px' }}>{t("addressData.modals.addNumber.title")}</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        value={selectedNumberType}
                        onChange={(e) => setSelectedNumberType(e.target.value as 'phone' | 'whatsapp')}
                        className="modal-radio-group"
                    >
                        <FormControlLabel
                            value="phone"
                            control={<Radio />}
                            label={t("addressData.modals.addNumber.phone")}
                        />
                        <FormControlLabel
                            value="whatsapp"
                            control={<Radio />}
                            label={t("addressData.modals.addNumber.whatsapp")}
                        />
                    </RadioGroup>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setAddNumberDialogOpen(false)} sx={{ color: '#616161' }}>{t("addressData.buttons.cancel")}</Button>
                    <Button onClick={handleAddNumber} sx={{ color: '#01579B', fontWeight: 600 }}>{t("addressData.buttons.add")}</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Deletion Confirmation */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle sx={{ fontWeight: 600 }}>
                    {deleteContext?.type === 'email' ? t("addressData.modals.deleteEmail.title") : t("addressData.modals.deletePhone.title")}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {deleteContext?.type === 'email' ? t("addressData.modals.deleteEmail.message") : t("addressData.modals.deletePhone.message")}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: '#616161' }}>{t("addressData.buttons.cancel")}</Button>
                    <Button onClick={handleDelete} sx={{ color: '#01579B', fontWeight: 600 }}>{t("addressData.buttons.delete")}</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default Address;


