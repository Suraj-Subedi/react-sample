import React from 'react';
import './Applynow.css';
import ApplyNowForm from '../../Forms/ApplyNowForm';


const ApplyNow = ({ isLoading, isSubmitting, registrationRequest }) => {
  return (
    <>
      {/* <div className='main-applynow'>
                <div className='logo'>
                    <img src='Logos.jpg' alt='School Logo' className='logo-img' />
                </div>
                <div className='header-content'>
                    <h1 className='h1-title'>
                        श्री कालीदेवी माध्यमिक विधालय <br />
                        Shree Kalidevi Secondary School <br />
                    </h1>
                    <p className='contact-info'>
                        Mahankal RM-1, Lalitpur, Nepal<br />
                        Tel: 01-4993212/45/67/44<br />
                        Email: shreekalidevisecondaryschool@gmail.com<br />
                        Web: www.Kalidevischool.edu.np<br />
                    </p>
                </div>
                <div className='admission-now'>Admission Now</div>
            </div> */}

      <div>
        <ApplyNowForm registrationRequest={registrationRequest} />
      </div>
    </>
  );
};


export default ApplyNow;
