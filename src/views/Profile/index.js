import React, { Component } from "react";
import { connect } from 'react-redux';
import { SERVER_URI } from 'config';

// reactstrap components
import {
   Button,
   Card,
   CardHeader,
   CardBody,
   FormGroup,
   Form,
   Input,
   Container,
   Row,
   Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { ToastContainer } from "react-toastify";
import InfoModal from "components/Helpers/InfoModal.js";

// FORMS
import Form_1_myaccount from "./forms/Form_1_myaccount.js";
import Form_2_personalInfo from "./forms/Form_2_personalInfo.js";
import Form_3_family_background from "./forms/Form_3_family_background.js";
import Form_4_educational_background from "./forms/Form_4_educational_background.js";
import Form_5_eligibility from "./forms/Form_5_eligibility.js";
import Form_6_work_experience from "./forms/Form_6_work_experience.js";
import Form_7_voluntary_work from "./forms/Form_7_voluntary_work.js";
import Form_8_learning_and_development from "./forms/Form_8_learning_and_development.js";
import Form_9_other_info from "./forms/Form_9_other_info.js";
import Form_10_questions from "./forms/Form_10_questions.js";
import Form_11_references from "./forms/Form_11_references.js";
import Form_12_upload_files from "./forms/Form_12_upload_files.js";
import ProfilePicture from "./forms/ProfilePicture.js";

import { GetMyInfo } from './redux/actions';
import { ArrangeName } from 'store/actions/helpers/displayAction';

class Profile extends Component {

   constructor(props) {
      props.GetMyInfo();

      super(props);
      const routes = {
         account: 1,
         personal_info: 2,
         family: 3,
         education: 4,
         eligibility: 5,
         work_experience: 6,
         voluntary_works: 7,
         LandD: 8,
         other: 9,
         questions: 10,
         references: 11,
         upload: 12,
      };

      this.state = {
         form: (props.match.params.type) ? routes[props.match.params.type] : 1,
         password: {
            old: {
               val: "",
               view: false,
            },
            new: {
               val: "",
               view: false,
            },
            conf: {
               val: "",
               view: false,
            },
         },
         passwordCollapse: false,
         modalPic: false,
      }

      this.changeForm = this.changeForm.bind(this);
      this.togglePassword = this.togglePassword.bind(this);
      this.toggleCollapse = this.toggleCollapse.bind(this);
      this.toggleProfilePic = this.toggleProfilePic.bind(this);

      // this.props.GetMyInfo();

   }

   toggleProfilePic() {
      this.setState({
         modalPic: !this.state.modalPic
      })
   }

   changeForm(no) {
      this.setState({
         form: no
      })
   }

   togglePassword(type, field, val) {
      if (type == 'all') {
         this.setState({
            password: {
               old: {
                  val: "",
                  view: false,
               },
               new: {
                  val: "",
                  view: false,
               },
               conf: {
                  val: "",
                  view: false,
               },
            },
         })

      } else {
         this.setState({
            password: {
               ...this.state.password,
               [type]: {
                  ...this.state.password[type],
                  [field]: val
               }
            }
         })

      }
   }

   toggleCollapse(type, field, val) {
      this.setState({
         passwordCollapse: !this.state.passwordCollapse
      })
   }



   render() {
      console.log(this.props.match.params.type);
      var ls     = JSON.parse(localStorage.getItem("nro13-info"));
      var device = localStorage.getItem("nro13-dvctype");
      var profilePic = localStorage.getItem("nro13-pp");

      var href = (device == "desktop")?"":"#form-container";
      console.log(href);
      console.log(device);
      const forms = ["",
         <Form_1_myaccount togglePassword={this.togglePassword} passwords={this.state.password} passwordCollapse={this.state.passwordCollapse} toggleCollapse={this.toggleCollapse} />, <Form_2_personalInfo />,
         <Form_3_family_background />, <Form_4_educational_background />,
         <Form_5_eligibility />, <Form_6_work_experience />,
         <Form_7_voluntary_work />, <Form_8_learning_and_development />,
         <Form_9_other_info />, <Form_10_questions />,
         <Form_11_references />, <Form_12_upload_files />,
         ""];


      return (
         <>
            <UserHeader />
            {/* Page content */}
            {/* <InfoModal
               size={"50%"}
               modal={this.state.passModal}
               toggle={this.togglePass}
               title={"Change Password"}
               form={<div>ss</div>}
               buttons={[
                  {
                     type: "Save", disable: false, callback: () => {
                     }
                  }
               ]}
            /> */}
            <InfoModal
               size={"40%"}
               modal={this.state.modalPic}
               toggle={this.toggleProfilePic}
               title={"Profile Picture"}
               form={<ProfilePicture />}
               buttons={[]}
            />
            <Container id="profile-container" className="mt--7" fluid>
               <Row>
                  <Col className="mb-5 mb-xl-0" xl="4">
                     <Card className="card-profile shadow">
                        <Row className="justify-content-center">
                           <Col className="order-lg-2" lg="3">
                              <div className="card-profile-image">
                                 {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                       alt="..."
                                       className="rounded-circle"
                                       src={
                                          require("../../assets/img/theme/lemar.jpg")
                                             .default
                                       }
                                    />
                                 </a> */}
                                 <div className="avatar-thumbnail-profile rounded-circle clickable"
                                    style={{
                                       backgroundImage: `url(${(profilePic != null)
                                          ? SERVER_URI + "images/users/" + profilePic
                                          : SERVER_URI + "images/users/male-temp.png"
                                          })`,

                                    }}
                                    onClick={() => {
                                       this.toggleProfilePic()
                                    }}
                                 >
                                 </div>
                              </div>
                           </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                           <div className="d-flex justify-content-between">
                              {/* <Button
                                 className="mr-4"
                                 color="info"
                                 href="#pablo"
                                 onClick={(e) => e.preventDefault()}
                                 size="sm"
                              >
                                 Connect
                              </Button>
                              <Button
                                 className="float-right"
                                 color="default"
                                 href="#pablo"
                                 onClick={(e) => e.preventDefault()}
                                 size="sm"
                              >
                                 Message
                              </Button> */}
                           </div>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                           <Row>
                              <div className="col">
                                 <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                    {/* <div>
                                       <span className="heading">22</span>
                                       <span className="description">Friends</span>
                                    </div>
                                    <div>
                                       <span className="heading">10</span>
                                       <span className="description">Photos</span>
                                    </div>
                                    <div>
                                       <span className="heading">89</span>
                                       <span className="description">Comments</span>
                                    </div> */}
                                 </div>
                              </div>
                           </Row>
                           <div className="text-center">
                              <h3>
                                 {this.props.ArrangeName(ls.name, 3)}
                                 <span className="font-weight-light">, 24</span>
                              </h3>
                              <div className="h5 font-weight-300">
                                 <i className="ni location_pin mr-2" />
                                 Butuan, Philippines
                              </div>
                              {/* <div className="h5 mt-4">
                                 <i className="ni business_briefcase-24 mr-2" />
                                 Information Systems Analyst
                              </div>
                              <div>
                                 <i className="ni education_hat mr-2" />
                                 Caraga State University
                              </div> */}
                              <hr className="my-4" />
                              {/* <p>
                                 Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                 Nick Murphy — writes, performs and records all of his own
                                 music.
                              </p>
                              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                 Show more
                              </a> */}
                           </div>
                        </CardBody>
                     </Card>

                     <Card className="card-profile card-profile-btns shadow">
                        <CardBody className="pt-0 pt-md-4">
                           <Row>
                              <div className="col">
                                 <Button href={href} className={"profile-btn" + ((this.state.form == 1) ? " active" : "")} color={(this.state.form == 1) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(1)}
                                 >
                                    My Account
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 2) ? " active" : "")} color={(this.state.form == 2) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(2)}
                                 >
                                    Personal Information
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 3) ? " active" : "")} color={(this.state.form == 3) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(3)}
                                 >
                                    Family Background
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 4) ? " active" : "")} color={(this.state.form == 4) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(4)}
                                 >
                                    Educational Background
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 5) ? " active" : "")} color={(this.state.form == 5) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(5)}
                                 >
                                    Civil Service Eligibility
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 6) ? " active" : "")} color={(this.state.form == 6) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(6)}
                                 >
                                    Work Experience
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 7) ? " active" : "")} color={(this.state.form == 7) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(7)}
                                 >
                                    Voluntary Works
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 8) ? " active" : "")} color={(this.state.form == 8) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(8)}
                                 >
                                    Learning & Development
                                 </Button>


                                 <Button href={href} className={"profile-btn" + ((this.state.form == 9) ? " active" : "")} color={(this.state.form == 9) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(9)}
                                 >
                                    Other Information
                                 </Button>

                                 {/* <Button href={href} className={"profile-btn" + ((this.state.form == 10) ? " active" : "")} color={(this.state.form == 10) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(10)}
                                 >
                                    Questions
                                 </Button> */}

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 11) ? " active" : "")} color={(this.state.form == 11) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(11)}
                                 >
                                    References
                                 </Button>

                                 <Button href={href} className={"profile-btn" + ((this.state.form == 12) ? " active" : "")} color={(this.state.form == 12) ? "primary" : ""}
                                    onClick={(e) => this.changeForm(12)}
                                 >
                                    Upload Files
                                 </Button>

                              </div>
                           </Row>

                        </CardBody>
                     </Card>

                  </Col>

                  {
                     forms[this.state.form]
                  }

               </Row>
            </Container>
         </>
      );

   }
}

const mapStateToProps = (state) => ({
   Profile: state.Profile,
})

export default connect(mapStateToProps, {
   GetMyInfo,
   ArrangeName,

})(Profile);
