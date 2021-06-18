import React from "react";


const SearchBox = (props) => {

    return <div>
        <div className="input-group searchBox">

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"> </i></span>
                </div>
                <input type="text" className="form-control" placeholder="search location"
                       onChange={props.handleChange("text")}
                       value={props.text}
                       onFocus={props.focusSearchInput} aria-describedby="basic-addon1"/>
            </div>
        </div>
        <button className={"btn btn-primary centerIcon"} disabled={props.myLocations.length===0}
             onClick={props.setModal}>
            <i className="fa fa-list"> </i>
        </button>
        {props.showSearchBox && props.searchData &&
        <div className="dropdown">
            <div className="searchBox-result">
                {props.searchData && props.searchData.map((item, idx) => {
                    return (
                        <div className={"row space"} key={idx}>
                            <div className={"col-md-12"}>
                                <span className="search-item"
                                      onClick={() => props.flyPinSearch(item)}>{item.address}</span>
                            </div>

                        </div>
                    )
                })}
                {
                    props.emptyList &&
                    <span className="search-item">{props.emptyList.message}</span>
                }
            </div>
        </div>
        }
    </div>
}

export default React.memo(SearchBox)
