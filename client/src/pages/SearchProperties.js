import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchProperties = () => {
    const [searchData, setSearchData] = useState({});
    const {userSearch} = useSelector((state)=>state.SearchReducer);
    console.log(userSearch);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchData);
    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, " : ", value);
        setSearchData({
            ...searchData,
            [name]: value,
        })
    }
    useEffect(()=>{

    },[]);
    return (
        <>
            <div class="header-section header-section-plot">
                <div class="inner-header-section inner-header-section-plot">
                    <h1 class="text-light text-center">We 'll find your dream house</h1>
                    <div class="search-form">
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <select class="form-select form-select-sm" value={userSearch.city} name="city" onChange={handleInput} aria-label=".form-select-sm example">
                                        <option selected>All cities</option>
                                        <option value="gujrat">Gujrat</option>
                                        <option value="gujranwala">Gujranwala</option>
                                        <option value="lahore">Lahore</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <input type="text" value={userSearch.location} name="location" onChange={handleInput} class="form-control form-control-sm" placeholder="Find location" />
                                </div>
                                <div class="col-2">
                                    <input type="submit"  value="Search" class="btn btn-sm btn-success" />
                                </div>
                            </div>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <select class="form-select form-select-sm" name="type" value={userSearch.type} onChange={handleInput} aria-label=".form-select-sm example">
                                        <option selected>Property Type</option>
                                        <option value="house">House</option>
                                        <option value="flat">Flat</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="residential">Residential</option>
                                        <option value="agriculture">Agricultural</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <select class="form-select form-select-sm" name="unit" value={userSearch.unit} onChange={handleInput} aria-label=".form-select-sm example">
                                        <option selected>Area Unit</option>
                                        <option value="acre">Acre</option>
                                        <option value="kanal">Kanal</option>
                                        <option value="feet">Sequare Feet</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <input type="number" value={userSearch.min_area} class="form-control form-control-sm" name="min_area" onChange={handleInput} placeholder="Min area" />
                                </div>
                            </div>
                            <div class="row mb-2 g-3">

                                <div class="col-4">
                                    <input type="number" value={userSearch.max_area} class="form-control form-control-sm" name="max_area" onChange={handleInput} placeholder="Max area" />
                                </div>
                                <div class="col-4">
                                    <input type="number" value={userSearch.min_price} class="form-control form-control-sm" name="min_price" onChange={handleInput} placeholder="Min price" />
                                </div>
                                <div class="col-4">
                                    <input type="number" value={userSearch.max_price} class="form-control form-control-sm" name="max_price" onChange={handleInput} placeholder="Max price" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchProperties;