import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import breakfast from '../../../src/images/breakfast.jpg';
import bike from '../../../src/images/bike.jpg';
import burgers from '../../../src/images/burgers.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Setting from '../../settings';
const { apiUrl } = Setting;
const urlApi = apiUrl+"/rest/1/yslc0xngd82nofw7/v1.dexa.mobile.dashboard";



class CarouselSlide extends Component {
    render(){
        return(
            <div>
                <Carousel className="carousel">
                    <Carousel.Item className="carousel-item">
                        <img
                        className="d-block w-100"
                        src={breakfast}
                        />
                        <Carousel.Caption>
                        {/* <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={bike}
                        />

                        <Carousel.Caption>
                        {/* <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={burgers} 
                        />

                        <Carousel.Caption>
                        {/* <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );

    }
}
export default CarouselSlide;