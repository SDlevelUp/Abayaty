'use client';

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "react-responsive-carousel/lib/styles/carousel.css";

const images = [
    "/img/abaya-women.webp",
    "/img/qamis-men.webp",
    "/img/abaya-women2.webp",
    "/img/sarwel-men.webp",
    "/img/qamis-enfant.webp",
];

export default function Slide() {
    return (
        <div className="lg:mt-0 lg:col-span-5 lg:flex relative">
            <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
            >
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img
                            src={image}
                            alt={`Image ${index}`}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
};