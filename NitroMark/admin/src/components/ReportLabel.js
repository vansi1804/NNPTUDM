import React from 'react';
import { BsArrowDownRight } from 'react-icons/bs';

const ReportLabel = ({ title, value }) => {
    return (
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">

            <div>
                <p className="desc">{title}</p>
                <h4 className="mb-0 sub-title">{value}</h4>
            </div>
            {/* <div className="d-flex flex-column align-items-end">
                <h6>
                    <BsArrowDownRight /> 32%
                </h6>
                <p className="mb-0  desc">Compared To Last Month</p>
            </div> */}
        </div>
    );
};

export default ReportLabel;