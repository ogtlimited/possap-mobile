/* eslint-disable @typescript-eslint/naming-convention */
export interface IEGSResponse {
  EscortInfo: EscortInfo;
  PoliceRanks: any;
  AddedOfficersSelection: any;
  OfficersSelection: any;
  RemovedOfficersSelection: any;
  NumberOfOfficers: number;
  StartDate: any;
  EndDate: any;
  StateLGAs: any;
  ListLGAs: any;
  ListOfCommands: ListOfCommand[];
  FlowDefinitionId: number;
  Partials: Partial[];
  TacticalSquadsSelection: any;
  AddedTacticalSquads: any;
  RemovedTacticalSquads: any;
  AddedFormations: any;
  FormationsSelection: any;
  RemovedFormations: any;
  AllocationGroupId: number;
  Permissions: any;
  RequestStages: RequestStage[];
  SelectedRequestStage: number;
  CommandTypeId: number;
  TaxEntity: TaxEntity;
  CategorySettings: CategorySettings;
  Comment: any;
  FileRefNumber: string;
  Status: number;
  ServiceTypeId: number;
  RequestId: number;
  ViewName: string;
  ApprovalStatus: number;
  ApproverId: number;
  ServiceName: string;
  Reason: any;
  StateName: any;
  LGAName: any;
  CommandName: any;
  CommandAddress: any;
  ServiceVM: any;
  DisplayDetailsForApproval: boolean;
  RequestDate: string;
  ApprovalDate: string;
  ApprovalNumber: any;
  ApprovalButtonName: string;
  CanInviteApplicant: boolean;
  IsApplicantInvitedForCapture: boolean;
  ApprovalPartialName: string;
  CbsUser: CbsUser;
  LocationName: string;
}

export interface EscortInfo {
  StartDate: string;
  EndDate: string;
  NumberOfOfficers: number;
  PSBillingType: number;
  PSBillingTypeDurationNumber: number;
  Address: string;
  FileRefNumber: any;
  Status: number;
  ParsedStartDate: string;
  ParsedEndDate: string;
  FormErrorNumber: number;
  DurationNumber: number;
  DurationType: number;
  SelectedReason: number;
  Reasons: any;
  OfficersHasBeenAssigned: boolean;
  ProposedOfficers: any[];
  SubCategoryId: number;
  SubSubCategoryId: number;
  ApprovalNumber: any;
  EscortServiceCategories: any;
  EscortCategoryTypes: any;
  SelectedEscortServiceCategories: any;
  SelectedOriginState: number;
  OriginStateName: string;
  SelectedOriginLGA: number;
  OriginLGAName: string;
  OriginLGAs: any;
  AddressOfOriginLocation: string;
  ShowExtraFieldsForServiceCategoryType: boolean;
  TaxEntitySubSubCategoryName: string;
  ServiceCategoryName: string;
  ServiceCategoryTypeName: string;
  CommandTypes: any;
  SelectedCommandType: number;
  SelectedCommandTypeName: string;
  TacticalSquads: any;
  SelectedTacticalSquad: number;
  Formations: any;
  SelectedFormationName: any;
  ViewedTermsAndConditionsModal: boolean;
  Caveat: any;
  ServiceId: number;
  HeaderObj: any;
  HasMessage: boolean;
  Reason: any;
  FlashObj: any;
  StateLGAs: any;
  ListLGAs: any;
  SelectedState: number;
  SelectedStateLGA: number;
  SelectedCommand: number;
  LGAName: string;
  StateName: string;
  CommandName: string;
  CommandAddress: string;
  CommandStateName: string;
  CommandLgaName: string;
  ExpectedHash: any;
  SiteName: any;
  InvoiceDescription: any;
  DontValidateFormControls: boolean;
  ServiceName: any;
  ServiceNote: any;
  AlternativeContactName: any;
  AlternativeContactPhoneNumber: any;
  AlternativeContactEmail: any;
  HasDifferentialWorkFlow: boolean;
}

export interface ListOfCommand {
  Name: string;
  Code: string;
  ParentCode: any;
  CommandCategoryId: number;
  LGAId: number;
  StateId: number;
  Id: number;
  LGAName: any;
  StateName: any;
  Address: any;
  CommandTypeId: number;
  SelectAllSections: boolean;
  SelectAllSubSections: boolean;
  AccessType: number;
}

export interface Partial {
  PartialName: string;
  PartialModel: PartialModel;
  ImplementationClass: string;
  RequestId: number;
  UserId: number;
  AllocationId: number;
  SquadAllocationGroup: number;
  CommandTypeId: number;
}

export interface PartialModel {
  InherentImplementationModel: any;
  InherentImplementationPartialName: any;
}

export interface RequestStage {
  Id: number;
  Name: string;
  LevelGrpId: number;
}

export interface TaxEntity {
  Recipient: string;
  Email: string;
  Address: string;
  PhoneNumber: string;
  TaxPayerIdentificationNumber: any;
  ExternalBillNumber: any;
  PayerId: any;
  Id: number;
  CashflowCustomerId: number;
  CategoryId: number;
  CategoryName: any;
  ExpertSystemId: number;
  SelectedState: number;
  SelectedStateLGA: number;
  RCNumber: any;
  SelectedStateName: string;
  SelectedLGAName: string;
  ContactPersonName: any;
  ContactPersonEmail: any;
  ContactPersonPhoneNumber: any;
  IdType: number;
  IdNumber: any;
  DefaultLGAId: number;
  Gender: number;
}

export interface CategorySettings {
  CanShowDropDown: boolean;
  IsPhoneNumberRequired: boolean;
  IsFederalAgency: boolean;
  ValidateContactEntityInfo: boolean;
  ValidateGenderInfo: boolean;
  ShowCorporateRequestReport: boolean;
  IsEmployer: boolean;
  CanShowSubUsersRequestReport: boolean;
}

export interface CbsUser {
  Name: string;
  Id: number;
  Verified: boolean;
  Email: string;
  PhoneNumber: string;
  IsAdministrator: boolean;
  TaxEntity: any;
}
