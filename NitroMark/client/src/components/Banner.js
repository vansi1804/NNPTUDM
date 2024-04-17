import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from './Container';

const Banner = () => {
    const { blogs } = useSelector((state) => state.blog);

    return (
        <Container class1="home-wrapper-1 py-5">
            <div className="row">
                <div className="col-6">
                    <div className="main-banner position-relative ">
                        <img
                            src={`${blogs && blogs[0]?.images[0]?.url}`}
                            className="img-fluid rounded-3"
                            alt="main banner"
                        />
                        <div className="main-banner-content position-absolute">
                            <h4>{`${blogs && blogs[0].category}`}</h4>
                            <h5>{`${blogs && blogs[0].title}`}</h5>
                            <p>{`${blogs && blogs[0].description.slice(0, 30)}..`}.</p>
                            <Link className="button mt-3" to={blogs && `/blog/${blogs[0]._id}`}>Read More</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">

                        <div className="small-banner position-relative">
                            <img
                                src="images/catbanner-01.jpg"
                                className="img-fluid rounded-3"
                                alt="main banner"
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>Best Sake</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>
                                    From $999.00 <br /> or $41.62/mo.
                                </p>
                            </div>
                        </div>
                        <div className="small-banner position-relative">
                            <img
                                src="images/catbanner-02.jpg"
                                className="img-fluid rounded-3"
                                alt="main banner"
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVAL</h4>
                                <h5>But IPad Air</h5>
                                <p>
                                    From $999.00 <br /> or $41.62/mo.
                                </p>
                            </div>
                        </div>
                        <div className="small-banner position-relative ">
                            <img
                                src="images/catbanner-03.jpg"
                                className="img-fluid rounded-3"
                                alt="main banner"
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVAL</h4>
                                <h5>But IPad Air</h5>
                                <p>
                                    From $999.00 <br /> or $41.62/mo.
                                </p>
                            </div>
                        </div>
                        <div className="small-banner position-relative ">
                            <img
                                src="images/catbanner-04.jpg"
                                className="img-fluid rounded-3"
                                alt="main banner"
                            />
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVAL</h4>
                                <h5>But IPad Air</h5>
                                <p>
                                    From $999.00 <br /> or $41.62/mo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Banner;