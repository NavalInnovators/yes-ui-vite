import React from 'react';
import './MySubjectSlider.css';

const ProgressSlider = ({ totalUnits, completedUnits }) => {
    const progress = (completedUnits / totalUnits) * 100;

    return (
        <div className="progress-slider-card">
            <div className="progress-slider-header">
                <span className="card-black-heading total-units">Total Units: {totalUnits}</span>
                <span className="card-grey-heading completed-units">
                    Completed: 
                    <div className="fraction-units">{completedUnits}/{totalUnits}</div>
                </span>
            </div>
            <input
                type="range"
                min="0"
                max={totalUnits}
                value={completedUnits}
                disabled
                className="progress-slider-input"
                style={{
                    background: `linear-gradient(90deg, #32AD6B 0%, #FEAC2F ${progress}%, #BDBDBD ${progress}%)`,
                }}
            />
        </div>
    );
};

export default ProgressSlider;
