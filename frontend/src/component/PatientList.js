
import Patient from './Patient';

const PatientList = (props) => {


    return (
        <div className="list-group border rounded border-secondary " style={{ 'overflowY': 'scroll', height: '600px' }}>
            {props.patientList.slice().reverse().map((p) => {
                return (<Patient key={p.PatientNumber} patientDetails={p}
                    findPatient={props.findPatient} />)
            })}


        </div>
    );
}

export default PatientList;