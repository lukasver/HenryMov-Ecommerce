import React from 'react';
import zxcvbn from 'zxcvbn'

export default function PasswordStrenghtMeter({ password }){
    const testResult = zxcvbn(password);
    const num = testResult.score * 100 / 4;

    const createPasswordLabel = () => {
        switch(testResult.score){
            case 0: 
                return 'Muy Debil';
            case 1:
                return 'Debil';
            case 2:
                return 'Buena';
            case 3:
                return 'Muy buena';
            case 4:
                return 'Excelente';
            default:
                return ''
        }
    }
    const progressColor = () => {
        switch(testResult.score){
            case 0: 
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none'
        }
    }

    const changeColorPassword = () => ({
        width: `${num}%`,
        background: progressColor(),
        height: "7px"
    })

    return(
        <>
        <div className="progress" style={{height: "7px", backgroundColor: 'none'}}>
            <div className="progress-bar" style={changeColorPassword()}></div>
        </div>
            <p style={{ color: progressColor()}}>{createPasswordLabel()}</p>
        </>
    )
}