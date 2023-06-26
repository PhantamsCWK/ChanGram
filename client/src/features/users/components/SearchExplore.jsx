import React, { useEffect, useState } from 'react'
import { Modal, SearchBar, UserListBar } from '../../../components';
import { useLazyGetSearchUserQuery } from '../usersApiSlice';

const SearchExplore = () => {
    const [query, setQuery] = useState("");
    const [ searchUser, { data: users, isFetching, error } ] = useLazyGetSearchUserQuery();

    const handleSearchUser = () => {
        if(query.length >= 3) {
            searchUser(query);
        }
    }

    useEffect(() => {
        if(query) {
            handleSearchUser()
        }
    }, [query])

    return (
        <>
            <div className='relative flex flex-col justify-start items-center px-1 gap-1'>
                <SearchBar setQuery={setQuery} />
                {
                    users && query && (
                        <div className='absolute top-14 bg-white border border-primary w-8/12 h-64 z-50 rounded-lg'>
                            <UserListBar users={query && users && users} isLoading={isFetching} isError={error} isNoneFollow />
                        </div>
                    )
                }
                
            </div>
        </>
  )
}

export default SearchExplore