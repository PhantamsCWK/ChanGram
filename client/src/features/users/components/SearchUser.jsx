import React, { useEffect, useState } from 'react'
import { BiSearchAlt2, BiX } from 'react-icons/bi'
import { Modal } from '../../../components';

const SearchUser = () => {
    const [isSearch, setIsSearch] = useState(false)
    const [SearchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if(SearchQuery.length <= 3) return 
        
        console.log("fetching some users")
    }, [SearchQuery])

    return (
    <Modal idModal="search_user">
        <div method='dialog' className="modal-box w-11/12 max-w-5xl relative sm:w-9/12 lg:w-7/12">
            <div className="form-control">
                <label className="input-group input-group-md w-full">
                    {
                        !isSearch && !SearchQuery && (
                            <button type='button' className='btn btn-primary'>
                                <BiSearchAlt2 size={25} />
                            </button>
                        )
                    }
                    <input type="text" onFocus={() => setIsSearch(true)} onBlur={() => setIsSearch(false)} onChange={(e) => setSearchQuery(e.target.value)} value={SearchQuery} placeholder="Type here" className="input input-primary input-bordered input-md w-full text-lg focus:outline-none" />
                    {
                        SearchQuery && (
                            <span onClick={() => setSearchQuery("") } className=' bg-inherit border-t border-r border-b border-purple-800 hover:cursor-pointer'>
                                <BiX size={25} color='#570DF8' />
                            </span>
                        )
                    }
                </label>
            </div>
        </div>
    </Modal>
  )
}

export default SearchUser