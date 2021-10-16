import React from "react";
import {connect} from 'react-redux';
import {searchLocation} from "../../actions/SearchActionCreator";
import Mapir from "mapir-react-component";
import SubmitModal from "./SubmitModal";
import ListModal from "./ListModal";
import SearchBox from "./searchBox";

let myLocations = [];

const Map = Mapir.setToken({
    movingMethod: "flyTo",
    transformRequest: (url) => {
        return {
            url: url,
            headers: {
                'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4MTVhMGQyZWUzODkwODg2ZWUyOWQyODkzMzE0NDA3ZmZkN2RiOGM0NmE4OGQ0YTllYWEyZmI5Nzc2N2U1NjJmOGQ0NWY3YzJhYzM3MzY3In0.eyJhdWQiOiIxNDM5MSIsImp0aSI6Ijc4MTVhMGQyZWUzODkwODg2ZWUyOWQyODkzMzE0NDA3ZmZkN2RiOGM0NmE4OGQ0YTllYWEyZmI5Nzc2N2U1NjJmOGQ0NWY3YzJhYzM3MzY3IiwiaWF0IjoxNjIzNzU2NDgwLCJuYmYiOjE2MjM3NTY0ODAsImV4cCI6MTYyNjM0ODQ4MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.HFIv0u0GczMGhXzofUgMIA7mg4rF5cVNRmoNIs-V9n7hdnsMvOznNIKNpuvBj5mOjDp0syM2F7VqENQeXqjqQDtdq-ZjTtjI8oJvrQTiaXWL9MdvykDtpx3YJ5PKGSb_Kqp19yQpfhJ3ncdhEvAqv-OQm1xdkt8XB6up9K_I9dP51FhX_2hOA0vZGn0ppBWmvwa0LVo8HsRc2m4p-koqVhwUHyHChQpN_LIHHgnZxoAe_nQCg52QAHcMg5COX9QttOZ86mTBxzy-75o9Jr4OSqZXixlTRNMV2-kHHO5Z2_k7ep08rBgDtFzAajziix4JBWkcHIbSpSHMeflMudZ6Ug',
                'Mapir-SDK': 'reactjs'
            }
        }

    }
});

class MapIr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 35.729054,
            lng: 51.420470,
            id: 1,
            filter: "",
            title: "",
            description: "",
            text: "",
            myLocations: [],
            searchLocations: [],
            showSearchBox: false,
            openSubmitModal: false,
            openListModal: false,
            showPopUp: false,
            editItem: false,
            invalidForm: false,
            emptyList: null
        };
    }

    componentDidMount() {

        /**
         read myLocations from localStorage at first and setState it
         */

        let myStorageLocations = JSON.parse(localStorage.getItem('myLocations'));
        if (myStorageLocations && myStorageLocations.length > 0) {
            myStorageLocations.map((item) => {
                myLocations.push({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    lat: item.lat,
                    lng: item.lng
                })
            })

            this.setState({myLocations, searchLocations: myLocations, id: myStorageLocations.slice(-1)[0].id + 1})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        /**
         after any change in myLocations , it should set in localStorage
         */

        if (this.state.myLocations !== prevState.myLocations) {
            localStorage.setItem('myLocations', JSON.stringify(this.state.myLocations));
            if (this.state.myLocations.length === 0) {
                this.setState({id: 1, openListModal: false})
            }
            this.setState({searchLocations: this.state.myLocations})
        }

        /**
         after open submit modal,other modal should close
         */

        if (this.state.openSubmitModal !== prevState.openSubmitModal) {
            if (!this.state.openSubmitModal) {
                this.setState({editItem: false, showPopUp: false})
            }
            if (this.state.openSubmitModal && !this.state.editItem) {
                this.setState({title: "", description: ""})
            }
        }

        /**
         if user search in myLocation list , the list should show the filter item
         */

        if (this.state.filter !== prevState.filter) {
            let searchLocations = [];
            if (this.state.filter !== "") {
                const lowerCasedFilter = this.state.filter.toLowerCase();
                searchLocations = this.state.myLocations.filter(item => item.title.toLowerCase().includes(lowerCasedFilter));
            } else {
                searchLocations = this.state.myLocations;
            }
            this.setState({searchLocations})
        }

        /**
         if user search in searchBar location, an search api should call
         */

        if (this.state.text !== prevState.text) {
            let model = {
                text: this.state.text,
                $filter: "province eq تهران",
                $select: "roads,poi"
            }
            this.props.searchLocation(model)
        }

        /**
         after search api call,any recommend location should show
         */

        if (this.props.searchReducer !== prevProps.searchReducer) {
            if (this.props.searchReducer.searchData !== prevProps.searchReducer.searchData && this.props.searchReducer.searchData.length > 0) {
                this.setState({searchData: this.props.searchReducer.searchData, emptyList: null})
            }
            if (this.props.searchReducer.emptyList !== prevProps.searchReducer.emptyList &&
                this.props.searchReducer.emptyList.response &&
                this.props.searchReducer.emptyList.response.data) {
                this.setState({emptyList: this.props.searchReducer.emptyList.response.data, searchData: []})
            }
            this.setState({showSearchBox: true, openListModal: false, openSubmitModal: false})
        }
    }

    /**
     get coordinate of location
     */

    getCoordinate = (Map, e) => {
        this.setState({
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
            openSubmitModal: true,
            openListModal: false,
            showSearchBox: false,
            invalidForm: false
        });
    }

    closeModal = () => {
        this.setState({openSubmitModal: false,lat: 35.729054, lng: 51.420470,title:""},()=>{
            let obj=this.state.myLocations.find(x => x.lat === this.state.lat)
            if(obj){
                this.setState({title:obj.title,showPopUp:true})
            }
        })
    }

    /**
     any change in all input and text area
     */

    handleChange = input => event => {
        this.setState({
            [input]: event.target.value
        });
    };

    /**
     submit the favor location for user
     */

    submit = () => {
        let myStorageLocations = JSON.parse(localStorage.getItem('myLocations')) ? JSON.parse(localStorage.getItem('myLocations')) : [];
        if (this.state.title === "") {
            this.setState({invalidForm: true})
        } else {
            myStorageLocations.push({
                id: this.state.id,
                title: this.state.title,
                description: this.state.description,
                lat: this.state.lat,
                lng: this.state.lng
            })
            this.setState({
                openSubmitModal: false,
                myLocations: myStorageLocations,
                id: this.state.id + 1,
                invalidForm: false
            })
        }
    }

    /**
     edit the title and description of location
     */

    edit = () => {
        let myStorageLocations = JSON.parse(localStorage.getItem('myLocations'));
        let editLocation = myStorageLocations.findIndex(x => x.id === this.state.id)
        myStorageLocations[editLocation].title = this.state.title;
        myStorageLocations[editLocation].description = this.state.description;
        this.setState({
            myLocations: myStorageLocations,
            openSubmitModal: false,
            id: myStorageLocations.slice(-1)[0].id + 1
        })
    }

    /**
     open the submit modal for edit the location and setState the required value
     */

    editLocation = (item) => {
        this.setState({
            id: item.id,
            title: item.title,
            description: item.description,
            lat: item.lat,
            lng: item.lng,
            openSubmitModal: true,
            openListModal: false,
            editItem: true,
            showPopUp: true,
            invalidForm: false
        })
    }

    /**
     delete the location
     */

    deleteLocation = (item) => {
        this.setState({myLocations: this.state.myLocations.filter(x => x.title !== item.title)})
    }

    /**
     fly the pin after click on title of any myLocation list
     */

    flyPin = (item) => {
        this.setState({
            title: item.title,
            description: item.description,
            id: item.id,
            lat: item.lat,
            lng: item.lng,
            openListModal: false,
            showPopUp: true
        })
    }
    /**
     fly the pin of searched location
     */

    flyPinSearch = (item) => {
        this.setState({
            lat: item.geom.coordinates[1],
            lng: item.geom.coordinates[0],
            showSearchBox: false
        })
    }

    /**
     focus on input of searchBox
     */
    focusSearchInput = () => {
        if (this.props.searchReducer.searchData) {
            this.setState({showSearchBox: true})
        }
    }

    /**
     edit the location if click on pin button
     */
    editPinLocation = () => {
        if (this.state.myLocations.find(x => x.lat === this.state.lat && this.state.title !== "")) {
            this.setState({editItem: true})
        }
        this.setState({openSubmitModal: true, invalidForm: false})
    }

    /**
     show tooltip
     */
    showPopUpTitle = () => {
        if (this.state.myLocations.find(x => x.lat === this.state.lat) && this.state.title !== "") {
            this.setState({showPopUp: true})
        }
    }

    render() {
        const {
            openSubmitModal,
            lat,
            lng,
            openListModal,
            showPopUp,
            searchLocations,
            showSearchBox,
            emptyList,
            searchData,
            myLocations
        } = this.state;

        return (
            <div>
                <SearchBox handleChange={this.handleChange}
                           setModal={() => this.setState({
                               openListModal: true,
                               openSubmitModal: false,
                               showSearchBox: false
                           })}
                           searchData={searchData}
                           showSearchBox={showSearchBox}
                           emptyList={emptyList}
                           myLocations={myLocations}
                           flyPinSearch={this.flyPinSearch}
                           focusSearchInput={this.focusSearchInput}/>
                {openSubmitModal &&
                <SubmitModal
                    closeModal={this.closeModal}
                    handleChange={this.handleChange}
                    submit={this.submit}
                    edit={this.edit}
                    summary={this.state}/>
                }
                {openListModal &&
                <ListModal myLocations={searchLocations}
                           closeListModal={() => this.setState({openListModal: false})}
                           editLocation={this.editLocation}
                           deleteLocation={this.deleteLocation}
                           flyPin={this.flyPin}
                           handleChange={this.handleChange}/>
                }

                <Mapir
                    center={[lng, lat]}
                    Map={Map}
                    onClick={this.getCoordinate}
                    userLocation
                    animationMode={'flyTo'}
                >
                    {showPopUp &&
                    <Mapir.Popup
                        coordinates={[lng, lat]}
                        offset={{
                            'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                        }}>
                        <h1>{this.state.title}</h1>
                    </Mapir.Popup>
                    }
                    <Mapir.Marker
                        coordinates={[lng, lat]}
                        onMouseEnter={this.showPopUpTitle}
                        onMouseLeave={() => this.setState({showPopUp: false})}
                        onClick={this.editPinLocation}
                        anchor="bottom">
                    </Mapir.Marker>
                </Mapir>
            </div>

        );
    }
}

function mapStateToProps(storeState) {
    return {
        searchReducer: storeState.searchReducer

    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchLocation: (model) =>
            dispatch(searchLocation(model)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapIr);
