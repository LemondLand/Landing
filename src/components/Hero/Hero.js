import React, { useState } from "react";
import "./Hero.scss";
import downIcon from "../../assets/down-arrow.svg";
import wheel from "../../assets/btn-wheel.svg";
import lemonade from "../../assets/lemonade.svg";
import lamanade from "../../assets/lamanade.png";
import lemonNetwork from "../../assets/lemonNetwork.png";

const Hero = () => {
  const windowSize = window.innerWidth;
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className="hero">
      <div className="wrap">
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
        <img className="logo" src={lemonade} alt="" />
      </div>
      <div className="text-wrapper">
        <p>
          <img height="100px" src={lemonNetwork}></img>{" "}
        </p>
        <p>
          Explore LEMONADE Ecosystem, Decentralized Finance for Eco-Traders{" "}
          <br />
          <b> Swap, farm, stake & earn with DeFi. </b>
        </p>
      </div>
      {windowSize > 1000 ? (
        <button className="anim-btn">
          <div>Launch App</div>
        </button>
      ) : (
        <button className="normal-btn">
          <div>Launch App </div>
          <img src={wheel} alt="" />
        </button>
      )}
      <a href="#mint">
        <img clasname="down" src={downIcon} alt="" />
      </a>
    </div>
  );
};

export default Hero;
