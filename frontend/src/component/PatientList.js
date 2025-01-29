
import React, { useEffect, useState } from 'react';
import Patient from './Patient';
//import data from './PatientListData.json'
import {getPatientList} from '../ApiUrls'

const PatientList = (props) => {
    const [patientList, setPatientList] = useState([]);
    const listSize=10;
    useEffect(() => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        };
        fetch(getPatientList+listSize, headers)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(res => {
                //console.log('response' + JSON.stringify(res.token));
                setPatientList(res);
            }).catch(err => {
                console.log('error response' + err);
            })
    }, []);

    return (
        <div className="list-group border rounded border-secondary " style={{ 'overflowY': 'scroll', height: '600px' }}>
            {patientList.map((p) => {
                return (<Patient key={p.PatientNumber} patientNo={p.PatientNumber}
                    patientName={p.PatientName}
                    age={p.Age}
                    husbandName={p.HusbandName}
                    fatherName={p.FatherName}
                    findPatient={props.findPatient} />)
            })}


        </div>
    );
}

export default PatientList;