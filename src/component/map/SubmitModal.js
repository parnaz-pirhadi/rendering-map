import React from "react";


const SubmitModal = (props) => {
    return <div className={"centerModal"}>
        <div className="modal-dialog fullWidth" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">add location</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={props.closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">title</span>
                        </div>
                        <input type="text" className="form-control" aria-label="title"
                               value={props.summary.title}
                               onChange={props.handleChange("title")}
                               aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">description</span>
                        </div>
                        <textarea className="form-control" aria-label="description"
                                  onChange={props.handleChange("description")}
                                  value={props.summary.description}
                                  aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            onClick={props.closeModal}>cancel
                    </button>
                    {!props.summary.editItem &&
                    <button type="button" className="btn btn-success" onClick={props.submit}>
                        submit
                    </button>
                    }
                    {props.summary.editItem &&
                    <button type="button" className="btn btn-success" onClick={props.edit}>
                        edit
                    </button>
                    }
                    {props.summary.invalidForm &&
                    <span className="search-item text-danger text-left">you should enter the title</span>}

                </div>
            </div>
        </div>
    </div>

}
export default React.memo(SubmitModal)
