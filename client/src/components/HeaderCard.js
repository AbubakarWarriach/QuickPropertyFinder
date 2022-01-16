
const HeaderCard = () => {
    return(
        <div class="header-section">
                <div class="inner-header-section">
                    <h1 class="text-light text-center">We 'll find your dream house</h1>
                    <div class="search-form">
                        <form>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>All cities</option>
                                        <option value="gujrat">Gujrat</option>
                                        <option value="gujranwala">Gujranwala</option>
                                        <option value="lahore">Lahore</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <input type="text" class="form-control form-control-sm" placeholder="Find location" />
                                </div>
                                <div class="col-2">
                                    <input type="submit" value="Search" class="btn btn-sm btn-success" />
                                </div>
                            </div>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>Property Type</option>
                                        <option value="rent">Homes</option>
                                        <option value="sale">Plots</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>Sub Property Type</option>
                                        <option value="house">House</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="residential">Residential</option>
                                        <option value="agriculture">Agricultural</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>Area Unit</option>
                                        <option value="acre">Acre</option>
                                        <option value="kanal">Kanal</option>
                                        <option value="feet">Sequare Feet</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-2 g-3">
                                <div class="col-4">
                                    <input type="number" class="form-control form-control-sm" placeholder="Min area" />
                                </div>
                                <div class="col-4">
                                    <input type="number" class="form-control form-control-sm" placeholder="Max area" />
                                </div>
                                <div class="col-4">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>Area Unit</option>
                                        <option value="acre">Acre</option>
                                        <option value="kanal">Kanal</option>
                                        <option value="feet">Sequare Feet</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    )
}
export default HeaderCard;