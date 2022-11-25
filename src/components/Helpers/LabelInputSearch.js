import React, { Fragment, useState } from 'react';
import LabelInput from './LabelInput';
import { connect } from 'react-redux';
import { ArrangeName } from 'store/actions/helpers/displayAction.js';
import { SetSelectedApplicant } from 'views/JobPost/redux/actions';

const LabelInputSearch = (props) => {
    const [searched, setSearched] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    var cCount = 3;
    var multiple = props.multiple ? props.multiple : false;


    return (
        <div className={"form-group label-input"}>
            <LabelInput
                label={props.label}
                prop={"type"}
                value={searched}
                type="text"
                req={1}
                placeholder=""
                onChange={(e) => {
                    var val = e.target.value;
                    setSearched(val);

                    if (val.length >= cCount) {
                        props.cbGetSearch(val);
                        // props.GetList("student/get", SET_DOCUMENTS_SEARCHED_STUD, 1, 100000, { name: e.target.value });
                    } else {
                        props.resetList();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key == "Backspace" && isSelected) {
                        props.resetList();
                        setSearched("");
                        setIsSelected(false);
                        props.onSelect(null);
                    }
                }}
            />
            {
                (props.list.length > 0)
                    ? <div id="div-search-suggestions">
                        {
                            props.list.map((row) => {
                                return (
                                    <div
                                        onClick={() => {

                                            if (multiple) {
                                                props.onSelect(row);
                                            } else {
                                                setSearched(props.ArrangeName(row.name));
                                                setIsSelected(true);
                                                props.resetList();
                                                props.onSelect(row)
                                            }

                                        }}
                                    >
                                        {props.ArrangeName(row.name)}
                                    </div>
                                )
                            })
                        }

                    </div>
                    : ""
            }


        </div>
    );
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    LabelInputSearch,
    ArrangeName,
})(LabelInputSearch);
