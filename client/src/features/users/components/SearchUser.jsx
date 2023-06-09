import React, { useEffect, useState } from 'react'
import { BiSearchAlt2, BiX } from 'react-icons/bi'
import { Modal, UserListBar } from '../../../components';
import { useLazyGetSearchUserQuery } from '../usersApiSlice';

const SearchUser = () => {
    const [isSearch, setIsSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [ SearchUser, { data: users, isLoading, error } ] = useLazyGetSearchUserQuery();


    const handleSearchUser = () => {
        if(searchQuery.length >= 3) {
            SearchUser(searchQuery);
        }
    }


    useEffect(() => {
        const debounceQuery = setTimeout(handleSearchUser, 1000);

        return () => clearTimeout(debounceQuery);
    }, [searchQuery])

    return (
    <Modal idModal="search_user">
        <div method='dialog' className="modal-box w-11/12 max-w-5xl sm:w-9/12 lg:w-8/12">
            <div className="form-control">
                <label className="join w-full">
                    {
                        !isSearch && !searchQuery && (
                            <button type='button' className='join-item btn btn-primary'>
                                <BiSearchAlt2 size={25} />
                            </button>
                        )
                    }
                    <input 
                        type="text" 
                        onFocus={() => setIsSearch(true)} 
                        onBlur={() => setIsSearch(false)} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        value={searchQuery} 
                        placeholder="Type here" 
                        className="join-item input input-primary input-bordered input-md w-full text-lg text-primary font-semibold focus:outline-none" 
                    />
                    {
                        searchQuery && (
                            <button onClick={() => setSearchQuery("") } className='join-item btn btn-outline btn-primary'>
                                <BiX size={25} />
                            </button>
                        )
                    }
                </label>
            </div>
            <UserListBar users={searchQuery && users && users} isLoading={isLoading} isError={error} isNoneFollow />
        </div>
    </Modal>
  )
}

export default SearchUser