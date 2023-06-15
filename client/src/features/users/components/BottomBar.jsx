import React from 'react'
import { BiCompass, BiHomeAlt2, BiPaperPlane, BiPlusCircle, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Bottombar = ({ userPhoto, username }) => {
  return (
    <div className="btm-nav z-50">
      <button className="text-primary">
        <Link to="/">
          <BiHomeAlt2 size={25} />
        </Link>
      </button>
      <button className="text-primary">
        <Link to="explore">
          <BiCompass size={25} />
        </Link>
      </button>
      <button className="text-primary">
        <Link to="direct">
          <BiPaperPlane size={25} />
        </Link>
      </button>
      <button className="text-primary">
        <label htmlFor='create-modal' className='hover:cursor-pointer'>
          <BiPlusCircle size={25} />
        </label>
      </button>
      <button className="text-primary">
        <Link to={username}>
          <div className='rounded-full w-[26px] h-[26px] overflow-hidden'>
            {
              userPhoto
              ? <img src={userPhoto} alt={username} className=' object-cover' />
              : <BiUser size={25} />
            }
          </div>
        </Link>
      </button>
    </div>
  )
}

export default Bottombar