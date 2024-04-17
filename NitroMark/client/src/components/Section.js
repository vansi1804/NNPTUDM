import React from 'react';
import Container from './Container';

const Section = ({ title, children }) => {
    return (
        <Container class1="blog-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">{`${title}`}</h3>
                </div>
            </div>
            <div className="row">
                {children}
            </div>
        </Container>
    );
};

export default Section;