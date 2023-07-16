import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin, BsOpticalAudio, BsTwitter } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="footer items-center p-4 border-t border-gray-300 mt-8">
      <div className="items-center grid-flow-col">
        <BsOpticalAudio size={40} />
        <p>Copyright © 2023 - All right reserved</p>
      </div> 
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://github.com/PhantamsCWK/ChanGram" target='_blank'>
            <BsGithub size={25} />
        </a>
        <a href="https://www.linkedin.com/in/chandra-wijaya-kusuma-a4564122a/" target='_blank'>
            <BsLinkedin size={25} />
        </a>
        <a href="https://www.instagram.com/chanwisuma/?hl=id" target='_blank'>
            <BsInstagram size={25} />
        </a>
      </div>
    </footer>
  )
}

export default Footer