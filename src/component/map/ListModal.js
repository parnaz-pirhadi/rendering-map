import React from "react";


const ListModal = (props) => {
    return <div className="dropdown">
        <div className="dropdown-list" aria-labelledby="dropdownMenu2">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"> </i></span>
                </div>
                <input type="text" className="form-control" placeholder="search location" onChange={props.handleChange("filter")} aria-describedby="basic-addon1"/>
            </div>

            {props.myLocations.length > 0 && props.myLocations.map((item, idx) => {
                return (
                    <div className={"row space"} key={idx}>
                        <div className={"col-md-6"}>
                        <button className="dropdown-item" type="button"
                                onClick={() => props.flyPin(item)}>{item.title}</button>
                    </div>
                        <div className={"col-md-6 text-right"}>
                            <span className="m-1 pointer"
                                  onClick={() => props.editLocation(item)}>
                                        <i className="fa fa-edit"> </i>
                                    </span>
                            <span className="m-1 pointer"
                                  onClick={() => props.deleteLocation(item)}>
                                        <i className="fa fa-trash"> </i>
                                    </span>
                        </div>

                    </div>
                )
            })}
        </div>
    </div>
}

export default React.memo(ListModal)
