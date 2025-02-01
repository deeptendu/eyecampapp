import React from 'react';


const Spinner = () => {
    return (
        <div className='container border rounded border-primary my-3' >
            <div className='row my-3'>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Spinner;