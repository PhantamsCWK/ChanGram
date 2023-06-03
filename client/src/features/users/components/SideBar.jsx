import { BiCompass, BiHomeAlt2, BiListUl, BiPaperPlane, BiPlusCircle, BiSearchAlt2, BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useMediaQuery } from '../../../hooks';
import { BsOpticalAudio } from 'react-icons/bs';
import { useSendLogoutMutation } from '../../auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { logOut } from '../../auth/authSlice';

const SideBar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMatch = useMediaQuery("(min-width: 1024px )");
  const [ sendLogout ] = useSendLogoutMutation();

  const onLogout = async () => {
    try {
      await sendLogout().unwrap();
      dispatch(logOut());
      navigate("/account")
    } catch (error) {
      console.log(error);
    }
  }

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
              <label htmlFor="search-user" className="flex items-center justify-start gap-5 hover:cursor-pointer">
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
              <Link to="p/643b9cdd7758ab9187dca666" className='flex items-center justify-start gap-5'>
                <BiPaperPlane size={25} />
                { isMatch && <span>Direct</span> }
              </Link>
            </div> */}
            <div className='py-[0.4rem]'>
              <label htmlFor="create-post" className="flex items-center justify-start gap-5 hover:cursor-pointer">
                <BiPlusCircle size={25} />
                { isMatch && <span>Create</span> }
              </label>
            </div>
            <div className='py-[0.4rem]'>
              <Link to={user.username } className='flex items-center justify-start gap-5'>
                <div className='border border-black rounded-full w-[26px] h-[26px] overflow-hidden'>
                  {
                    user.picturePath 
                    ? <img src={user.picturePath} alt={user.username} className=' object-cover' />
                    : <BiUser size={25} />
                  }
                </div>
                { isMatch && <span>{user.username}</span> }
              </Link>
            </div>
            <div className='pt-[60px]'>
              <div className="dropdown dropdown-top">
                <label tabIndex={0} className='flex items-center justify-start gap-5 hover:cursor-pointer'>
                  <BiListUl size={25} />
                  { isMatch && <span>Others</span> }
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-md bg-base-100 rounded-box w-52">
                  <li>
                    <label onClick={onLogout} >
                      Logout
                    </label>
                  </li>
                  <li>
                    <label href="">
                      Settings
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
      
    </>
  )
}

export default SideBar