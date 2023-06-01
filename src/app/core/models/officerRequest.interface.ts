/* eslint-disable @typescript-eslint/naming-convention */
export interface IOfficerRequest {
    data: Data;
}

export interface Data {
    Error:          boolean;
    ErrorCode:      null;
    ResponseObject: ResponseObject;
}

export interface ResponseObject {
    InvoiceNumber:         null;
    ApprovalNumber:        null;
    FileNumber:            null;
    Status:                number;
    From:                  string;
    End:                   string;
    ServiceType:           null;
    ServiceRequestTypes:   ServiceRequestType[];
    SelectedRequestPhase:  number;
    Requests:              Request[];
    TotalNumberOfInvoices: number;
    Pager:                 null;
    TotalRequestRecord:    number;
    TotalRequestAmount:    number;
    LogoURL:               null;
    TenantName:            null;
    PaymentRef:            null;
    RevenueHeads:          null;
    SelectedRevenueHead:   null;
    ReceiptNumber:         null;
    Commands:              null;
    CustomerName:          null;
    SelectedCommand:       null;
    State:                 number;
    LGA:                   number;
    StateLGAs:             StateLGAs[];
    ListLGAs:              null;
    Take:                  number;
    Skip:                  number;
}

export interface Request {
    Id:                    number;
    TaxEntityId:           number;
    ServiceName:           string;
    FileRefNumber:         string;
    ApprovalNumber:        null;
    RequestDate:           Date;
    CustomerName:          string;
    InvoiceNumber:         null;
    LastActionDate:        Date;
    InvoiceStatus:         number;
    InvoiceAmount:         number;
    ServiceTypeId:         number;
    ServiceId:             number;
    RequestDateString:     string;
    LastActionDateString:  string;
    ApprovedBy:            null;
    Comment:               null;
    Status:                number;
    StatusId:              number;
    CommandName:           null;
    State:                 null;
    LGA:                   null;
    BranchName:            null;
    FlowDefinitionLevelId: number;
    RequestPhaseName:      string;
}

export interface ServiceRequestType {
    Id:          number;
    Name:        string;
    ServiceType: number;
}

export interface StateLGAs {
    Id:           number;
    LGAs:         LGAs[];
    Name:         string;
    ShortName:    string;
    IsActive:     boolean;
    CreatedAtUtc: Date;
    UpdatedAtUtc: Date;
}

export interface LGAs {
    Id:           number;
    Name:         string;
    IsActive:     boolean;
    CodeName:     null;
    CreatedAtUtc: Date;
    UpdatedAtUtc: Date;
    State:        null;
}


export interface Ipcc {
    Tribe:                                    null;
    CountryOfOrigin:                          string;
    StateOfOrigin:                            null;
    DateOfBirth:                              string;
    PlaceOfBirth:                             string;
    DestinationCountry:                       string;
    IsPreviouslyConvicted:                    string;
    IsBiometricsEnrolled:                     boolean;
    PreviousConvictionHistory:                string;
    PassportPhotographFileName:               string;
    InternationalPassportDataPageFileName:    string;
    SignatureFileName:                        null;
    PassportPhotographFilePath:               string;
    InternationalPassportDataPageFilePath:    string;
    SignatureFilePath:                        null;
    PassportPhotographContentType:            string;
    InternationalPassportDataPageContentType: string;
    SignatureContentType:                     null;
    PassportPhotographBlob:                   string;
    InternationalPassportDataPageBlob:        string;
    SignatureBlob:                            null;
    CountryOfPassport:                        string;
    PassportNumber:                           string;
    PlaceOfIssuance:                          string;
    DateOfIssuance:                           string;
    RefNumber:                                null;
    ShowReferenceNumberForm:                  boolean;
    DefinitionId:                             number;
    DefinitionLevelId:                        number;
    Position:                                 number;
    IsLastApprover:                           boolean;
    SelectedCPCCR:                            null;
    SelectedCPCCRPoliceOfficerLogId:          number;
    RequestStages:                            RequestStage[];
    SelectedRequestStage:                     number;
    TaxEntity:                                ITaxEntity;
    CategorySettings:                         null;
    Comment:                                  null;
    FileRefNumber:                            string;
    Status:                                   number;
    ServiceTypeId:                            number;
    RequestId:                                number;
    ViewName:                                 string;
    ApprovalStatus:                           number;
    ApproverId:                               number;
    ServiceName:                              string;
    Reason:                                   string;
    StateName:                                string;
    LGAName:                                  string;
    CommandName:                              string;
    CommandAddress:                           string;
    ServiceVM:                                null;
    DisplayDetailsForApproval:                boolean;
    RequestDate:                              Date;
    ApprovalDate:                             Date;
    ApprovalNumber:                           null;
    ApprovalButtonName:                       string;
    CanInviteApplicant:                       boolean;
    IsApplicantInvitedForCapture:             boolean;
    ApprovalPartialName:                      string;
    CbsUser:                                  CbsUser;
    LocationName:                             null;
}

export interface CbsUser {
    Name:            string;
    Id:              number;
    Verified:        boolean;
    Email:           string;
    PhoneNumber:     string;
    IsAdministrator: boolean;
    TaxEntity:       null;
}

export interface RequestStage {
    Id:                    number;
    Position:              number;
    PositionName:          string;
    PositionDescription:   null;
    RequestDirectionValue: number;
    ApprovalButtonName:    null;
    DefinitionName:        string;
    DefinitionId:          number;
    ServiceId:             number;
}

export interface ITaxEntity {
    Recipient:                    string;
    Email:                        string;
    Address:                      string;
    PhoneNumber:                  string;
    TaxPayerIdentificationNumber: null;
    ExternalBillNumber:           null;
    PayerId:                      null;
    Id:                           number;
    CashflowCustomerId:           number;
    CategoryId:                   number;
    CategoryName:                 null;
    ExpertSystemId:               number;
    SelectedState:                number;
    SelectedStateLGA:             number;
    RCNumber:                     null;
    SelectedStateName:            string;
    SelectedLGAName:              string;
    ContactPersonName:            null;
    ContactPersonEmail:           null;
    ContactPersonPhoneNumber:     null;
    IdType:                       number;
    IdNumber:                     null;
    DefaultLGAId:                 number;
    Gender:                       number;
}
