/* eslint-disable @typescript-eslint/naming-convention */
export const middleWareBaseUrl = 'http://localhost:3000/api/v1';
export const serverBaseUrl = 'http://pss.cbs/api/v1/pss';
// export const serverBaseUrl = 'https://test.possap.ng/api/v1/pss';
// export const serverBaseUrl = 'https://possap.herokuapp.com/api/v1';

export const GoogleMapUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=';
export const baseEndpoints = {
    auth: serverBaseUrl + '/proxyauthentication',
    officer: serverBaseUrl + '/officers',
    upload: serverBaseUrl + '/upload',
    nin: serverBaseUrl + '/helper/verifyNIN',
    extractApproval: serverBaseUrl + '/extract-approval',

    apNumber: serverBaseUrl + '/helper/verifyAPNumber',
    services: serverBaseUrl + '/possap-services',
    possapSserviceFields: serverBaseUrl + '/possap-service-fields'
  };

export const requestEndpoints = {
    allRequest: serverBaseUrl + '/request-approval/list',
    requestDetails: serverBaseUrl + '/request-approval/details',

};
export const middlewareEndpoints = {
    fetchRequest: middleWareBaseUrl + '/cbs-routes/fetch-data',
};

export const officerEndpoints = {
    login: baseEndpoints.officer + '/login',
    signup: baseEndpoints.officer + '/signup',
    validate: baseEndpoints.officer + '/validate-otp',
};
export const authEndpoints = {
    login: baseEndpoints.auth + '/admin/signin',
    signup: baseEndpoints.officer + '/signup',
    activate: baseEndpoints.auth + '/register/activate',
    forgotPasswordInitiate: baseEndpoints.auth + '/forgot-password/initiate',
    forgotPasswordComplete: baseEndpoints.auth + '/forgot-password/complete',
    changePassword: baseEndpoints.auth + '/change-password',
    updateProfile: baseEndpoints.auth + '/update/profile',
    updateProfileImage: baseEndpoints.auth + '/update/profile/image',
};


export const serviceEndpoint = {
    getExtracts: baseEndpoints.extractApproval + '/request-approval',
    approveExtract: baseEndpoints.extractApproval + '/approve-request',
    rejectExtract: baseEndpoints.extractApproval + '/reject-request',
};
export const miscEndpoint = {
    mediaUpload: baseEndpoints.upload + '/uploadMedia',
    policeData: baseEndpoints + '/police-data',
    tacticalPath: baseEndpoints + '/tactical-squad',
};


