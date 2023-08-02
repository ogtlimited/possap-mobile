/* eslint-disable @typescript-eslint/naming-convention */

/** Middle ware proxy url */
export const middleWareBaseUrl = 'https://possapbackend-development.ogtlprojects.com/api/v1';
// export const middleWareBaseUrl = 'http://localhost:5000/api/v1';

/** CBS BASE URL */
// export const serverBaseUrl = 'http://pss.cbs/api/v1/pss';
export const serverBaseUrl = 'https://test.possap.ng/api/v1/pss';

// export const CBSDomainUrl = 'https://test.possap.ng';
export const DownloadUrl =
  'https://test.possap.ng/Admin/Police/Request/Details';

export const GoogleMapUrl =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=';
export const baseEndpoints = {
  auth: serverBaseUrl + '/proxyauthentication',
  officer: serverBaseUrl + '/officers',
  upload: serverBaseUrl + '/upload',
  nin: serverBaseUrl + '/helper/verifyNIN',
  extractApproval: serverBaseUrl + '/extract-approval',
  pccApproval: serverBaseUrl + '/character-certificate-approval',
  EGSApproval: serverBaseUrl + '/escort-approval',
  utility: serverBaseUrl + '/utility',
  apNumber: serverBaseUrl + '/helper/verifyAPNumber',
  services: serverBaseUrl + '/possap-services',
  possapSserviceFields: serverBaseUrl + '/possap-service-fields',
};

export const requestEndpoints = {
  allRequest: serverBaseUrl + '/request-approval/list',
  requestReport: serverBaseUrl + '/request-approval/request-reports',
  requestDetails: serverBaseUrl + '/request-approval/details',
};
export const middlewareEndpoints = {
  fetchRequest: middleWareBaseUrl + '/cbs-routes/fetch-data',
  download: middleWareBaseUrl + '/helper/download',
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
export const utilityEndpoint = {
  services: baseEndpoints.utility + '/get-services',
  countries: baseEndpoints.utility + '/get-countries',
  paymentRef: baseEndpoints.utility + '/get-payment-reference',
  adminFormation: baseEndpoints.utility + '/get-commands-for-admin-in-state',
  lgaFormation: baseEndpoints.utility + '/get-lga-area-and-divisional-commands',
};

export const serviceEndpoint = {
  getExtracts: baseEndpoints.extractApproval + '/request-approval',
  approveExtract: baseEndpoints.extractApproval + '/approve',
  rejectExtract: baseEndpoints.extractApproval + '/reject',
  routePcc: baseEndpoints.pccApproval + '/approval-routing',
  approvePcc: baseEndpoints.pccApproval + '/approve',
  rejectPcc: baseEndpoints.pccApproval + '/reject',
  routeEGS: baseEndpoints.EGSApproval + '/approval-routing',
  approveEGS: baseEndpoints.EGSApproval + '/approve',
  finalEGSApprover: baseEndpoints.EGSApproval + '/final-approval',
};
export const miscEndpoint = {
  policeOfficerDetails: baseEndpoints.utility + '/get-police-officer-details',
  getLgaAreaAndDivisionalCommand:
    baseEndpoints.utility + '/get-lga-area-and-divisional-commands',
  mediaUpload: baseEndpoints.upload + '/uploadMedia',
  policeData: baseEndpoints + '/police-data',
  tacticalPath: baseEndpoints + '/tactical-squad',
};
