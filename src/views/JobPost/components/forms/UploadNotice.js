import React, { useState } from 'react';
import { connect } from 'react-redux';

import PDFUploaderViewer from 'components/Helpers/PDFUploaderViewer';
import { SERVER_URI } from 'config';
import {
    UploadNoticeFile,
} from '../../redux/actions';

const UploadNotice = (props) => {
    var file = null;
    console.log(props);
    if (props.applicant.hasOwnProperty("filesFromNEDA")) {
        var tempFile = props.applicant.filesFromNEDA.filter((file) => file.name == props.type && file.status == "current")
        console.log(tempFile);
        if (tempFile.length > 0) {
            file = SERVER_URI + "files/notice/" + tempFile[0].path
        }
    }

    console.log(file);

    return (
        <div id="pdf-notice-file">
            <PDFUploaderViewer origFile={file} upload={(file) => {
                props.UploadNoticeFile(file, props.type, props.applicant, props.JobPost.values._id);
            }}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    JobPost: state.JobPost
})

export default connect(mapStateToProps, {
    UploadNoticeFile,
})(UploadNotice);
