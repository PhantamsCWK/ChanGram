import React from 'react'
import { BiCompass, BiHomeAlt2, BiListUl, BiPaperPlane, BiPlusCircle, BiSearchAlt2, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Bottombar = ({ user }) => {
  return (
    <div className="btm-nav">
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
        <Link to={user.username}>
          <div className='rounded-full w-[26px] h-[26px] overflow-hidden'>
            {
              user.picturePath 
              ? <img src={user.picturePath} alt={user.username} className=' object-cover' />
              : <BiUser size={25} />
            }
          </div>
        </Link>
      </button>
    </div>
  )
}

export default Bottombar