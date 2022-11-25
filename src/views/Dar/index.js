import React, { Component } from "react";
import { connect } from 'react-redux';

// reactstrap components
import {
   SET_DARS,
} from "./redux/types";

import {
   GetList,
} from "store/actions/helpers/displayAction";

import {
   GetBacklogs,
} from "./redux/actions";

// core components
import DarMainTable from "./components/DarMainTable.js";
import DarHeader from "./components/DarHeader.js";
import { GetDate } from "store/actions/helpers/dateAction";

class Dar extends Component {

   constructor(props) {
      super(props);

      this.state = {

      }

      var d = new Date();
      d.setDate(d.getDate() - 11);
      d.setHours(8, 0, 0, 0);

      props.GetList("dar/get-mine", SET_DARS, 1, 10, { gDate: d }, { date: -1 });
      props.GetBacklogs();
   }

   render() {

      return (
         <div className="custom-content">
            <DarHeader />
            <DarMainTable />
         </div>
      );

   }
}

const mapStateToProps = (state) => ({
   Dar: state.Dar,
})

export default connect(mapStateToProps, {
   GetList,
   GetDate,
   GetBacklogs,
})(Dar);
