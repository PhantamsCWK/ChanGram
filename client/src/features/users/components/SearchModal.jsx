import React, { useEffect, useState } from 'react'
import { Modal, SearchBar, UserListBar } from '../../../components';
import { useLazyGetSearchUserQuery } from '../usersApiSlice';

const SearchModal = () => {
    const [query, setQuery] = useState("");
    const [ searchUser, { data: users, isLoading, error } ] = useLazyGetSearchUserQuery();

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
    <Modal idModal="search_user">
        <div method='dialog' className="modal-box w-11/12 max-w-5xl sm:w-9/12 lg:w-8/12">
            <SearchBar setQuery={setQuery} />
            <UserListBar users={query && users && users} isLoading={isLoading} isError={error} isNoneFollow />
        </div>
    </Modal>
  )
}

export default SearchModal