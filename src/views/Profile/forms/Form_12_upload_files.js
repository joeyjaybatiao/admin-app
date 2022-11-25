import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import LabelInput from 'components/Helpers/LabelInput';
import InfoModal from "components/Helpers/InfoModal.js";
import FileUpload from 'components/Helpers/FileUpload';
import { SetValue, ArrangeDate } from 'store/actions/helpers/displayAction.js';
import { GetDate } from 'store/actions/helpers/dateAction.js';
import { SET_PROFILE_DATA } from '../redux/types';
import { UpdateReferences, GetProfileFile, SaveProfileFile, AddCertificates, RemoveCertificate, } from '../redux/actions';
import { SERVER_URI } from 'config';

class Form_12_upload_files extends Component {

    constructor(props) {
        super(props);

        var fPDS = null, fRes = null, fApp = null;

        for (let i = 0; i < this.props.pValues.files.length; i++) {
            if (this.props.pValues.files[i].type == "pds" && this.props.pValues.files[i].status == "current") {
                fPDS = { ...this.props.pValues.files[i] };
                break;
            }
        }

        for (let i = 0; i < this.props.pValues.files.length; i++) {
            if (this.props.pValues.files[i].type == "resume" && this.props.pValues.files[i].status == "current") {
                fRes = { ...this.props.pValues.files[i] };
                break;
            }
        }

        for (let i = 0; i < this.props.pValues.files.length; i++) {
            if (this.props.pValues.files[i].type == "app-letter" && this.props.pValues.files[i].status == "current") {
                fApp = { ...this.props.pValues.files[i] };
                break;
            }
        }

        this.state = {
            fPDS: fPDS,
            fRes: fRes,
            fApp: fApp,

            modalCert: false,

            certFile: {
                file: null,
                name: ""
            },

            toDelete: null
        }

        this.toggleModalCert = this.toggleModalCert.bind(this);


    }

    toggleModalCert() {
        this.setState({
            modalCert: !this.state.modalCert
        })
    }


    render() {

        return (
            <>
                <InfoModal
                    size={"40%"}
                    modal={this.state.modalCert}
                    toggle={this.toggleModalCert}
                    title={""}
                    form={<Fragment>
                        <Col lg="12">
                            <LabelInput
                                label={"Tag"}
                                type="text"
                                value={this.state.certFile.name}
                                req={1}
                                placeholder=""
                                onChange={(e) => {
                                    this.setState({
                                        certFile: {
                                            ...this.state.certFile,
                                            name: e.target.value
                                        }
                                    })
                                }}
                            />
                        </Col>

                        <Col lg="12"><br />
                            <div className="pl-lg-4">
                                <FileUpload
                                    GetProfileFile={(file) => {
                                        this.setState({
                                            certFile: {
                                                ...this.state.certFile,
                                                file: file
                                            }
                                        })
                                    }}
                                    file={null}
                                    filetype="image/*"
                                />
                            </div>
                        </Col>

                    </Fragment>}
                    buttons={[{
                        type: "Save", disable: false,
                        callback: async () => {
                            await this.props.AddCertificates(this.state.certFile.file, this.state.certFile.name, () => {
                                this.setState({
                                    certFile: {
                                        file: null,
                                        name: ""
                                    },
                                })
                            })
                        }
                    }]}
                />



                <Col id="form-container" className="order-xl-1" xl="8">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Upload Files</h3>
                                </Col>
                                {/* <Col className="text-right" xs="4">
                                <Button
                                    color="primary"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    size="sm"
                                >
                                    Edit
                                </Button>
                            </Col> */}
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row className="align-items-center">
                                    <Col lg="12">
                                        <h3 className="mb-0">PDS</h3>
                                    </Col>

                                    <Col lg="12"><br />
                                        <div className="pl-lg-4">
                                            <FileUpload
                                                GetProfileFile={(file) => {
                                                    this.props.GetProfileFile(file, "pds");
                                                }}
                                                file={this.state.fPDS}
                                                doctype="pds"
                                            />
                                        </div>
                                    </Col>
                                    {
                                        (this.state.fPDS != null)
                                            ? <div>
                                                <h6 className="heading-small text-muted">
                                                    <strong>Name:</strong> {this.state.fPDS.name}
                                                </h6>
                                                <h6 className="heading-small text-muted">
                                                    <strong>Uploaded:</strong> {this.props.ArrangeDate(this.state.fPDS.dateUploaded)}
                                                </h6>
                                            </div>
                                            : ""

                                    }

                                    {
                                        (this.state.fPDS != null)
                                            ? <Col className="text-right" lg="12"><br />
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        this.setState({
                                                            fPDS: null
                                                        })
                                                    }}
                                                    size="sm"
                                                >
                                                    Upload New File
                                                </Button>
                                            </Col>
                                            : <Col className="text-right" lg="12"><br />
                                                <Button
                                                    color="primary"
                                                    onClick={async () => {
                                                        await this.props.SaveProfileFile("pds", () => {
                                                            var f = null;

                                                            for (let i = 0; i < this.props.pValues.files.length; i++) {
                                                                if (this.props.pValues.files[i].type == "pds" && this.props.pValues.files[i].status == "current") {
                                                                    f = { ...this.props.pValues.files[i] };
                                                                    break;
                                                                }
                                                            }
                                                            this.setState({
                                                                fPDS: f
                                                            })

                                                        });

                                                    }}
                                                    size="sm"
                                                >
                                                    Save File
                                                </Button>
                                            </Col>
                                    }



                                </Row>
                                <hr className="my-4" />

                            </Form>

                            <Form>
                                <Row className="align-items-center">
                                    <Col lg="12">
                                        <h3 className="mb-0">Application Letter</h3>
                                    </Col>

                                    <Col lg="12"><br />
                                        <div className="pl-lg-4">
                                            <FileUpload
                                                GetProfileFile={(file) => {
                                                    this.props.GetProfileFile(file, "app-letter");
                                                }}
                                                file={this.state.fApp}
                                                doctype="app-letter"
                                            />
                                        </div>
                                    </Col>
                                    {
                                        (this.state.fApp != null)
                                            ? <div>
                                                <h6 className="heading-small text-muted">
                                                    <strong>Name:</strong> {this.state.fApp.name}
                                                </h6>
                                                <h6 className="heading-small text-muted">
                                                    <strong>Uploaded:</strong> {this.props.ArrangeDate(this.state.fApp.dateUploaded)}
                                                </h6>
                                            </div>
                                            : ""

                                    }
                                    {
                                        (this.state.fApp != null)
                                            ? <Col className="text-right" lg="12"><br />
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        this.setState({
                                                            fApp: null
                                                        })
                                                    }}
                                                    size="sm"
                                                >
                                                    Upload New File
                                                </Button>
                                            </Col>
                                            : <Col className="text-right" lg="12"><br />
                                                <Button
                                                    color="primary"
                                                    onClick={async () => {
                                                        await this.props.SaveProfileFile("app-letter", () => {
                                                            var f = null;

                                                            for (let i = 0; i < this.props.pValues.files.length; i++) {
                                                                if (this.props.pValues.files[i].type == "app-letter" && this.props.pValues.files[i].status == "current") {
                                                                    f = { ...this.props.pValues.files[i] };
                                                                    break;
                                                                }
                                                            }
                                                            this.setState({
                                                                fApp: f
                                                            })

                                                        });
                                                    }}
                                                    size="sm"
                                                >
                                                    Save File
                                                </Button>
                                            </Col>
                                    }

                                </Row>
                                <hr className="my-4" />

                            </Form>

                            <Form>
                                <Row className="align-items-center">
                                    <Col className="text-left" lg="12"><br />
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                this.toggleModalCert();
                                            }}
                                            size="sm"
                                        >
                                            Upload Certificates
                                        </Button>
                                    </Col>
                                    <Row id="certificates">

                                        {
                                            this.props.pValues.files.map((cert, i) => {
                                                return (cert.type == "certificate" && cert.status == "current") ? (
                                                    <div className="col-md-4 cert-div">
                                                        <div className="userAvatar"
                                                            style={{
                                                                backgroundImage: `url(${SERVER_URI + "files/certificate/" + cert.path})`
                                                            }}
                                                        >

                                                            {
                                                                (cert._id == this.state.toDelete)
                                                                    ? ""
                                                                    : <i className="ni ni-fat-remove" onClick={() => {
                                                                        this.setState({
                                                                            toDelete: cert._id
                                                                        })
                                                                    }}></i>
                                                            }


                                                            {
                                                                (cert._id == this.state.toDelete)
                                                                    ? <div id="remove-confirm-div">
                                                                        <Button
                                                                            color="primary"
                                                                            onClick={() => {
                                                                                this.props.RemoveCertificate(cert._id)
                                                                            }}
                                                                            size="sm"
                                                                        >
                                                                            Yes
                                                                        </Button>
                                                                        <Button
                                                                            color="primary"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    toDelete: null
                                                                                })
                                                                            }}
                                                                            size="sm"
                                                                        >
                                                                            No
                                                                        </Button>
                                                                    </div>
                                                                    : ""
                                                            }

                                                            {/* <div id="remove-confirm-div" style={(cert._id == this.state.toDelete)?{display:"flex"}:{display:"none"}}>
                                                                <Button
                                                                    color="primary"
                                                                    onClick={() => {
                                                                    }}
                                                                    size="sm"
                                                                >
                                                                    Yes
                                                                </Button>
                                                                <Button
                                                                    color="primary"
                                                                    onClick={() => {
                                                                    }}
                                                                    size="sm"
                                                                >
                                                                    No
                                                                </Button>
                                                            </div> */}

                                                        </div>

                                                        <div className="img-details">
                                                            <h6 className="heading-small text-muted">
                                                                <strong>Name:</strong> {cert.name}
                                                            </h6>
                                                            <h6 className="heading-small text-muted">
                                                                <strong>Uploaded:</strong> {this.props.ArrangeDate(cert.dateUploaded, false)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                ) : "";
                                            })
                                        }

                                    </Row>
                                </Row>
                                <hr className="my-4" />

                            </Form>

                        </CardBody>
                    </Card>
                </Col>

            </>
        );
    };
};

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    pValues: state.Profile.values
})

export default connect(mapStateToProps, {
    SetValue,
    ArrangeDate,
    GetDate,
    UpdateReferences,
    GetProfileFile,
    SaveProfileFile,
    AddCertificates,
    RemoveCertificate,
})(Form_12_upload_files);
