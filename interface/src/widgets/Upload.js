import "./Upload.css"
import {UploadIcon} from "./UploadIcon.js";

import React  from 'react';
import AWS from 'aws-sdk'



const S3_BUCKET ='resumerovers';
const REGION ='us-east-2';


AWS.config.update({
    accessKeyId: 'AKIAW66W6SLLUKS4PY4U',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


const UploadFileToS3 = (props) => {

    const handleFileInput = (e) => {
        uploadFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                if(evt.loaded/evt.total >= 1)
                    props.actionProvider.messageHandler("https://resumerovers.s3.us-east-2.amazonaws.com/" + file.name);
                
            })
            .send((err) => {
                if (err) console.log(err)
            })

    }

    return (

        <div className="upload-wrap">
            <button type="button" className="upload-button"><UploadIcon/></button>
            <input type="file" onChange={handleFileInput} className="upload-btn"/>
        </div>
    )
}

export default UploadFileToS3;