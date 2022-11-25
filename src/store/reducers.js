import { combineReducers } from 'redux';

import AlertReducer from './alertReducer';
import ProfileReducer from '../views/Profile/redux/reducer';
import JobPostReducer from '../views/JobPost/redux/reducer';
import ApplicantReducer from '../views/Applicant/redux/reducer';
import PersonnelReducer from '../views/Personnel/redux/reducer';
import RoleReducer from '../views/Role/redux/reducer';
import OfficeReducer from '../views/Office/redux/reducer';
import ICTRepairRequestReducer from '../views/ICTRepairRequest/redux/reducer';
import ItemTypeReducer from '../views/ItemType/redux/reducer';
import ItemReducer from '../views/Item/redux/reducer';
import DarReducer from '../views/Dar/redux/reducer';
import TimestampReducer from '../views/Timestamp/redux/reducer';

//=================~import reducer file~=================

export default combineReducers({
  Alert: AlertReducer,
  Profile: ProfileReducer,
  JobPost: JobPostReducer,
  Applicant: ApplicantReducer,
  Personnel: PersonnelReducer,
  Role: RoleReducer,
  Office: OfficeReducer,
  ICTRepairRequest: ICTRepairRequestReducer,
  ItemType: ItemTypeReducer,
  Item: ItemReducer,
  Dar: DarReducer,
  Timestamp: TimestampReducer,
});

