/* eslint-disable @typescript-eslint/naming-convention */
export const serverBaseUrl = 'http://localhost:3000/api/v1';
// export const serverBaseUrl = 'https://possap.herokuapp.com/api/v1';
export const GoogleMapUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=';
export const baseEndpoints = {
    auth: serverBaseUrl + '/auth',
    user: serverBaseUrl + '/users',
    upload: serverBaseUrl + '/upload',
    nin: serverBaseUrl + '/helper/verifyNIN',
    apNumber: serverBaseUrl + '/helper/verifyAPNumber',
    eag: serverBaseUrl + '/eag'
  };
export const authEndpoints = {
    login: baseEndpoints.auth + '/login',
    signup: baseEndpoints.auth + '/signup',
    activate: baseEndpoints.auth + '/register/activate',
    forgotPasswordInitiate: baseEndpoints.auth + '/forgot-password/initiate',
    forgotPasswordComplete: baseEndpoints.auth + '/forgot-password/complete',
    changePassword: baseEndpoints.auth + '/change-password',
    updateProfile: baseEndpoints.auth + '/update/profile',
    updateProfileImage: baseEndpoints.auth + '/update/profile/image',
};


export const miscEndpoint = {
    mediaUpload: baseEndpoints.upload + '/uploadMedia',
    policeData: baseEndpoints + '/police-data',
    tacticalPath: baseEndpoints + '/tactical-squad',
};


