import { BiCompass, BiHomeAlt2, BiListUl, BiPaperPlane, BiPlusCircle, BiSearchAlt2, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks';
import { BsOpticalAudio } from 'react-icons/bs';

const SideBar = () => {
  const isMatch = useMediaQuery("(min-width: 1024px )");

  return (
    <>
      <div className="h-full pt-5 bg-white border-r border-gray-300 fixed block z-20">
          <div className={`flex flex-col gap-5 p-5 bg-base-100 ${ isMatch && "lg:w-52"}`}>
            <div className='h-[90px]'>
              <Link to="/" className='text-3xl text-center'>
                {
                  isMatch
                  ? <span>Socmed</span>
                  : <BsOpticalAudio size={25} />
                }
              </Link>
            </div>
            <div className='py-[0.4rem]'>
              <Link to="/" className='flex items-center justify-start gap-5'>
                <BiHomeAlt2 size={25} />
                { isMatch  && <span>Home</span> }
              </Link>
            </div>
            <div className='py-[0.4rem]'>
              <label htmlFor="search-modal" className="flex items-center justify-start gap-5 hover:cursor-pointer">
                <BiSearchAlt2 size={25} />
                { isMatch && <span>Search</span> }
              </label>
            </div>
            <div className='py-[0.4rem]'>
              <Link to="explore" className='flex items-center justify-start gap-5'>
                <BiCompass size={25} />
                { isMatch && <span>Explore</span> }
              </Link>
            </div>
            {/* <div className='py-[0.4rem]'>
              <Link to="direct" className='flex items-center justify-start gap-5'>
                <BiPaperPlane size={25} />
                { isMatch && <span>Direct</span> }
              </Link>
            </div> */}
            <div className='py-[0.4rem]'>
              <label htmlFor="create-modal" className="flex items-center justify-start gap-5 hover:cursor-pointer">
                <BiPlusCircle size={25} />
                { isMatch && <span>Create</span> }
              </label>
            </div>
            <div className='py-[0.4rem]'>
              <Link to="chandrakusuma" className='flex items-center justify-start gap-5'>
                <BiUser size={25} />
                { isMatch && <span>Profile</span> }
              </Link>
            </div>
            <div className='pt-[60px]'>
              <Link to="others" className='flex items-center justify-start gap-5'>
                <BiListUl size={25} />
                { isMatch && <span>Others</span> }
              </Link>
            </div>
          </div>
      </div>
      
    </>
  )
}

export default SideBar