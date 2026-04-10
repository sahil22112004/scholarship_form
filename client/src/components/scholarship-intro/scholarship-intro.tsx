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

const ScholarshipIntro = () => {
  const { currentUser } = useAppSelector((state) => state.auth)
  const router = useRouter()

  return (
    <div className="page">
      <div className="content">
        <div className="left">
          <img src="scholarship-intro-page-image.png" alt="form illustration" />
        </div>

        <div className="right">
          <h1>¡Hi, {currentUser?.first_name} {currentUser?.last_name}!</h1>

          <h2>
            Welcome to the online scholarship application form
          </h2>

          <p>
            By filling out this form you will begin the application
            process for our international scholarship program for
            undergraduate or graduate studies.
          </p>

          <p>
            In order to start the process you must enter the
            corresponding data:
          </p>

          <div className="steps">
            <div className="step">
              <span><PersonOutlineOutlinedIcon fontSize="medium" /></span>
              <strong>Personal</strong>
            </div>
            <div className="step">
              <span> <SchoolOutlinedIcon fontSize="medium" /> </span>
              <strong>Academic</strong>
            </div>
            <div className="step">
              <span> <BusinessCenterOutlinedIcon fontSize="medium" /> </span>
              <strong>Labor</strong>
            </div>
            <div className="step">
              <span> <FolderSharedOutlinedIcon fontSize="medium" /> </span>
              <strong>References</strong>
            </div>
            <div className="step">
              <span> <DescriptionOutlinedIcon fontSize="medium" /> </span>
              <strong>Documents</strong>
            </div>
          </div>

          <p className="footer-text">
            Once the requested information has been entered and sent,
            our advisors will contact you. Our selection process for
            FUNIBER scholarship applicants takes between 5 to 10
            working days. If you have any doubts or questions, please
            contact your commercial advisor.
          </p>

          <div className="button-container">
            <button className="start-btn" onClick={()=>router.push('/scholarship-form-application')}>START</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipIntro;