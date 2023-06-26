import React, { useEffect, useState } from 'react'
import { BiSearchAlt2, BiX } from 'react-icons/bi';

const SearchBar = ({ setQuery }) => {
    const [isSearch, setIsSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const debounceQuery = setTimeout(() => setQuery(searchQuery) , 1000);

        return () => clearTimeout(debounceQuery);
    }, [searchQuery])

  return (
    <div className="form-control w-full">
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
  )
}

export default SearchBar