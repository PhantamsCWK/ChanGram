import React from 'react'
import { BiCompass, BiHomeAlt2, BiListUl, BiPaperPlane, BiPlusCircle, BiSearchAlt2, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Bottombar = () => {
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
        <label htmlFor='my-modal-5' className='hover:cursor-pointer'>
          <BiPlusCircle size={25} />
        </label>
      </button>
      <button className="text-primary">
        <Link to="chandra wijaya kusuma">
          <BiUser size={25} />
        </Link>
      </button>
    </div>
  )
}

export default Bottombar