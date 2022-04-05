import React, { useState, useEffect } from "react";
import "./Mint.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import obj from "../../assets/mint-obj.png";
import Carousel from "react-bootstrap/Carousel";
import MintCarousel from "./MintCarousel";
const Mint = () => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);
	const [hover1, setHover1] = useState(false);
	const [hover2, setHover2] = useState(false);
	const [hover3, setHover3] = useState(false);
	const [btnHover, setBtnHover] = useState(false);
	const windowSize = window.innerWidth;
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<div className='mint'>
			{windowSize > 1000 ? (
				<div className='mint-box-container'>
					<div
						onMouseEnter={() => setHover1(true)}
						onMouseLeave={() => setHover1(false)}
						className='mint-box'
						data-aos='fade-up'
					>
						<span> {hover1 == false ? "Mint" : "What is?"}</span>
						{hover1 == false ? (
							<p>
								With the tokens of the holders, new blocks are added to the
								blockchain and when these blocks are completed, the holders are
								rewarded.
							</p>
						) : (
							<p>
								It involves lending or staking your cryptocurrency coins or
								tokens to get rewards in the form of transaction fees or
								interest. .
							</p>
						)}
					</div>
					<div
						onMouseEnter={() => setHover2(true)}
						onMouseLeave={() => setHover2(false)}
						className='mint-box'
						data-aos='fade-down'
					>
						<span> {hover2 == false ? "ERC20" : "What is?"}</span>
						{hover2 == false ? (
							<p>
								All Lemonade tokens are based on the ERC-20 standard, Lemonade
								just interact with this token.
								{/* Access an immutable Automated Market Maker Protocol directly on
                Energy Web Chain (EWC). */}
							</p>
						) : (
							<p>
								One of the most significant tokens, which has emerged as the
								technical standard used for all smart contracts on the Ethereum
								blockchain for token implementation.
							</p>
						)}
					</div>
					<div
						onMouseEnter={() => setHover3(true)}
						onMouseLeave={() => setHover3(false)}
						className='mint-box'
						data-aos='fade-down'
					>
						<span> {hover3 == false ? "Staking" : "What is?"}</span>
						{hover3 == false ? (
							<p>
								Staking can be a great way to use your crypto to generate
								passive income, we offer high interest rates for staking.
							</p>
						) : (
							<p>
								Staking cryptocurrencies is a process that involves committing
								your crypto assets to support a blockchain network and confirm
								transactions.
							</p>
						)}
					</div>
				</div>
			) : (
				<MintCarousel />
			)}
			<div className='mint-hero'>
				<p data-aos='fade-down'>
					<b>Lemonade</b> enables the world's First <b>DEX</b>, built on{" "}
					<b>Energy Web Chain</b>, <br /> promoting the acceleration of
					Blockchain usage with low-carbon footprint. <br />
				</p>
				<button>
					<div>Launch App</div>
				</button>

				<img src={obj} alt='' className='obj' />
			</div>
		</div>
	);
};

export default Mint;
