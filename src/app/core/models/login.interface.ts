/* eslint-disable @typescript-eslint/naming-convention */
export interface IOfficerDetails {
    Id:                 number;
    Name:               string;
    RankId:             number;
    RankName:           string;
    RankCode:           string;
    IdNumber:           string;
    IppisNumber:        string;
    CommandId:          number;
    CommandCategoryId:  number;
    SubCommandId:       number;
    SubCommandCode:     null;
    SubSubCommandId:    number;
    CommandName:        string;
    CommandCode:        null;
    AccountNumber:      string;
    PhoneNumber:        null;
    IsActive:           boolean;
    PoliceOfficerLogId: number;
}
