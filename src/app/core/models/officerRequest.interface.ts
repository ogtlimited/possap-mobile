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
