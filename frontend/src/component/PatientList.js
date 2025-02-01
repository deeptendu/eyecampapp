
import Patient from './Patient';

const PatientList = (props) => {


    return (
        <div className="list-group border rounded border-secondary " style={{ 'overflowY': 'scroll', height: '600px' }}>
            {props.patientList.map((p) => {
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