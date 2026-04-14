'use client'

import React from "react";
import "./scholarship-intro.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {useAppSelector} from '@/hooks/use-redux-hook'
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';


const ScholarshipIntro = () => {
  const { currentUser } = useAppSelector((state) => state.auth)
  const router = useRouter()
    const { t, i18n } = useTranslation();
  

  return (
    <div className="page">
      <div className="content">
        <div className="left">
          <img src="scholarship-intro-page-image.png" alt="form illustration" />
        </div>

        <div className="right">
          <h1>{t("scholarshipIntro.greeting")}, {currentUser?.first_name} {currentUser?.last_name}!</h1>

          <h2>
            {t("scholarshipIntro.title")}
          </h2>

          <p>
            {t("scholarshipIntro.description_1")}
          </p>

          <p>
            {t("scholarshipIntro.description_2")}
          </p>

          <div className="steps">
            <div className="step">
              <span><PersonOutlineOutlinedIcon fontSize="medium" /></span>
              <strong>{t("scholarshipIntro.steps.personal")}</strong>
            </div>
            <div className="step">
              <span> <SchoolOutlinedIcon fontSize="medium" /> </span>
              <strong>{t("scholarshipIntro.steps.academic")}</strong>
            </div>
            <div className="step">
              <span> <BusinessCenterOutlinedIcon fontSize="medium" /> </span>
              <strong>{t("scholarshipIntro.steps.labor")}</strong>
            </div>
            <div className="step">
              <span> <FolderSharedOutlinedIcon fontSize="medium" /> </span>
              <strong>{t("scholarshipIntro.steps.references")}</strong>
            </div>
            <div className="step">
              <span> <DescriptionOutlinedIcon fontSize="medium" /> </span>
              <strong>{t("scholarshipIntro.steps.documents")}</strong>
            </div>
          </div>

          <p className="footer-text">
            {t("scholarshipIntro.footer")}
          </p>

          <div className="button-container">
            <button className="start-btn" onClick={()=>router.push('/scholarship-form-application')}>{t("scholarshipIntro.button")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipIntro;