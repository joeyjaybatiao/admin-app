import {
  SET_PROFILE_DATA,
  UPDATE_CHILDREN,
  UPDATE_EDUCATION,
  UPDATE_ELIGIBILITY,
  UPDATE_WORK_EXPERIENCE,
  UPDATE_VOLUNTARY_WORK,
  UPDATE_TRAINING,
  UPDATE_SKILL,
  UPDATE_RECOGNITION,
  UPDATE_MEMBERSHIP,
  UPDATE_REFERENCES,
  SET_USER_INFO,
  SET_PROFILE_FILE,
  UPDATE_FILES,
  SET_NEW_JOB_APPLIED,
  SET_SAVED_JOB_APPLIED,
  SET_USER_AVATAR,
} from './types';
import { SetRegValueHelper, SpreadOps } from 'store/reducerHelpers';

const initialState = {
  rows: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  values: {},
  default: {
    username: "",
    password: "",

    name: {
      first: "",
      mid: "",
      last: "",
      ext: "",
    },

    designation: "",
    status: "",
    office: null,
    role: null,

    pds: {
      personalInfo: {
        birth: {
          date: null,
          place: "",
        },
        citizenship: {
          type: "",
          by: "",
          details: "",
        },
        sex: null,
        cStatus: "",
        address: [
          {
            block: "",
            street: "",
            village: "",
            brgy: "",
            cm: "",
            province: "",
            zipcode: "",
          }
        ],
        height: 0,//meter
        weight: 0,//kg
        blood: "",
        contact: {
          telephone: "",
          mobile: "",
          email: "",
        },
        ids: {
          gsis: "",
          pagibig: "",
          philhealth: "",
          sss: "",
          tin: "",
          agency: "",
          other: {
            name: "",
            number: "",
            date: null,
            place: "",
          },
        }
      },

      family: {
        spouse: {
          first: "",
          mid: "",
          last: "",
          ext: "",
          occupation: {
            name: "",
            employer: "",
            address: "",
            telephone: "",
          },
        },
        children: [{
          name: "",
          dob: null,
        }],
        father: {
          first: "",
          mid: "",
          last: "",
          ext: "",
        },
        mother: {
          first: "",
          mid: "",
          last: "",
        },
      },

      education: [{
        level: "",
        school: "",
        degree: "",
        period: {
          from: null,
          to: null,
        },
        unitsEarned: "",
        yearGraduated: "",
        academicHonor: "",
      }],

      eligibility: [{
        name: "",
        rating: "",
        exam: {
          date: null,
          place: "",
        },
        license: {
          number: "",
          validity: null,
        }
      }],

      workExperience: [{
        inclusive: {
          from: null,
          to: null,
        },
        position: "",
        office: "",
        salary: {
          grade: "",
          amount: "",
        },
        appointment: "",
        isGovService: null, // 1 yes, 0 no
      }],

      voluntary: [{
        name: "",
        inclusive: {
          from: null,
          to: null,
        },
        hours: 0,
        position: "",
      }],

      trainings: [{
        name: "",
        inclusive: {
          from: null,
          to: null,
        },
        hours: 0,
        type: "",
        conductedBy: "",
      }],

      others: {
        skillsHobbies: [{
          name: "",
        }],
        recognition: [{
          name: ""
        }],
        membership: [{
          name: ""
        }],
      },

      questions: { // 1 yes, 0 no
        consanguinity: {
          third: "",
          fourth: "",
        },
        adminOffense: "",
        charged: "",
        convicted: "",
        separated: "",
        candidate: "",
        resigned: "",
        immigrant: "",
        RAs: {
          member: "",
          pwd: "",
          soloParent: "",
        },
      },

      references: [{
        name: "",
        address: "",
        telephone: "",
      }],

    },
    files: [{
      type: "",//profile pic, pds, etc.
      status: "",//current, deleted, previous
      dateUploaded: null,
      name: "",
      path: "",
    }],
    appliedJobs: [],
    savedJobs: [],

    userID: "",
    psn: "",
  },
  tempFiles: [],
  tempAvatar: {
    file: "",
    base64: "",
  }
};

var temp;
initialState.values = SpreadOps({ ...initialState.default });

export default function (state = initialState, action) {

  switch (action.type) {
    // ============================================ TRICYCLE ============================================
    case SET_PROFILE_DATA:
      temp = { ...state.values };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        values: { ...temp },
        submitted: false
      }

    case SET_NEW_JOB_APPLIED:

      return {
        ...state,
        values: {
          ...state.values,
          appliedJobs: [...state.values.appliedJobs, {
            job: action.id,
            date: new Date,
          }]
        },
      }

    case SET_SAVED_JOB_APPLIED:

      return {
        ...state,
        values: {
          ...state.values,
          savedJobs: [...state.values.savedJobs, {
            job: action.id,
            date: new Date,
          }]
        },
      }

    case UPDATE_FILES:

      return {
        ...state,
        values: {
          ...state.values,
          files: [...action.files]
        },
      }

    case SET_PROFILE_FILE:

      return {
        ...state,
        tempFiles: [
          {
            file: action.file,
            type: action.fType
          },
          ...state.tempFiles,
        ],
        submitted: false
      }

    case SET_USER_INFO:
      return {
        ...state,
        values: { ...action.info },
        submitted: false
      }

    case UPDATE_CHILDREN:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            family: {
              ...state.values.pds.family,
              children: [...action.children]
            }
          }
        }
      }

    case UPDATE_EDUCATION:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            education: [...action.education]
          }
        }
      }

    case UPDATE_ELIGIBILITY:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            eligibility: [...action.eligibility]
          }
        }
      }

    case UPDATE_VOLUNTARY_WORK:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            voluntary: [...action.voluntary]
          }
        }
      }

    case UPDATE_WORK_EXPERIENCE:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            workExperience: [...action.workExperience]
          }
        }
      }

    case UPDATE_TRAINING:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            trainings: [...action.trainings]
          }
        }
      }

    case UPDATE_SKILL:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            others: {
              ...state.values.pds.others,
              skillsHobbies: [...action.skillsHobbies]
            }
          }
        }
      }

    case UPDATE_RECOGNITION:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            others: {
              ...state.values.pds.others,
              recognition: [...action.recognition]
            }
          }
        }
      }

    case UPDATE_MEMBERSHIP:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            others: {
              ...state.values.pds.others,
              membership: [...action.membership]
            }
          }
        }
      }


    case UPDATE_REFERENCES:
      return {
        ...state,
        values: {
          ...state.values,
          pds: {
            ...state.values.pds,
            references: [...action.references]
          }
        }
      }

    case SET_USER_AVATAR:
      return {
        ...state,
        tempAvatar: {
          file: action.file,
          base64: action.base64,
        }
      }

    default:
      return state

  }
}
