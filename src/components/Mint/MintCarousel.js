import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const MintCarousel = () => {
	return (
		<div className='mint-box-container'>
			<Carousel  width="40%" showStatus={false} swipeable={true} showThumbs={false} showArrows={false} emulateTouch={true}>
				<div className='mint-box-mobile' data-aos='fade-up'>
					<span>ERC-20</span>
					<p>All Lemonade tokens are based on the ERC-20 standard.</p>
				</div>
				<div className='mint-box-mobile' data-aos='fade-up'>
					<span>Decentralized</span>
					<p>
						ccess an immutable Automated Market Maker Protocol directly on
						Energy Web Chain (EWC).
					</p>
				</div>
				<div className='mint-box-mobile' data-aos='fade-up'>
					<span>Scalable</span>

					<p>
						Built on Energy Web Chain for fast, secure, environmentally friendly
						and low cost transactions.
					</p>
				</div>
			</Carousel>
		</div>
	);
};

export default MintCarousel;
