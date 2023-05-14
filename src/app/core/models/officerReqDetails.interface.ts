/* eslint-disable @typescript-eslint/naming-convention */
export interface IOfficerRequestDetails {
  data: Data;
}
export interface Data {
    Error:          boolean;
    ErrorCode:      null;
    ResponseObject: ResponseObject;
}
export interface ResponseObject {
  SelectedCategory: number;
  SelectedSubCategory: number;
  SelectedCategoryName: null;
  SelectedSubCategoryName: null;
  IsIncidentReported: string;
  IncidentReportedDate: null;
  AffidavitNumber: string;
  AffidavitDateOfIsssuance: Date;
  Attachments: Attachment[];
  SelectedExtractCategories: SelectedExtractCategory[];
  Details: null;
  Action: null;
  DiarySerialNumber: null;
  IncidentDate: null;
  IncidentDateAndTimeParsed: null;
  IncidentTime: null;
  CrossReferencing: null;
  Content: null;
  DefinitionId: number;
  Position: number;
  IsLastApprover: boolean;
  SelectedDPO: null;
  SelectedDPOPoliceOfficerLogId: number;
  TaxEntity: TaxEntity;
  CategorySettings: null;
  Comment: null;
  FileRefNumber: string;
  Status: number;
  ServiceTypeId: number;
  RequestId: number;
  ViewName: string;
  ApprovalStatus: number;
  ApproverId: number;
  ServiceName: string;
  Reason: string;
  StateName: string;
  LGAName: string;
  CommandName: string;
  CommandAddress: string;
  ServiceVM: null;
  DisplayDetailsForApproval: boolean;
  RequestDate: Date;
  ApprovalDate: Date;
  ApprovalNumber: null;
  ApprovalButtonName: string;
  CanInviteApplicant: boolean;
  IsApplicantInvitedForCapture: boolean;
  ApprovalPartialName: string;
  CbsUser: CbsUser;
  LocationName: null;
}

export interface Attachment {
  FileName: string;
  FilePath: string;
  ContentType: string;
  Blob: string;
}

export interface CbsUser {
  Name: string;
  Id: number;
  Verified: boolean;
  Email: string;
  PhoneNumber: string;
  IsAdministrator: boolean;
  TaxEntity: null;
}

export interface SelectedExtractCategory {
  ExtractDetailsId: number;
  ExtractCategoryId: number;
  ExtractSubCategoryId: number;
  RequestReason: string;
}

export interface TaxEntity {
  Recipient: string;
  Email: string;
  Address: string;
  PhoneNumber: string;
  TaxPayerIdentificationNumber: null;
  ExternalBillNumber: null;
  PayerId: null;
  Id: number;
  CashflowCustomerId: number;
  CategoryId: number;
  CategoryName: null;
  ExpertSystemId: number;
  SelectedState: number;
  SelectedStateLGA: number;
  RCNumber: null;
  SelectedStateName: string;
  SelectedLGAName: string;
  ContactPersonName: null;
  ContactPersonEmail: null;
  ContactPersonPhoneNumber: null;
  IdType: number;
  IdNumber: null;
  DefaultLGAId: number;
  Gender: number;
}
