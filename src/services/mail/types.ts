import { IUser } from '@models/index';

export interface IRegistrationProps {
    firstName: string;
    verificationLink: string;
}

export interface ICreateUserProps {
    firstName: string;
    password: string;
    organization: string;
    email: string;
}

export interface IReportProcessProps {
    firstName: string;
    path: string;
}

export interface IContactUsTempalate {
    name: string;
    email: string;
    company: string;
    description?: string;
    phone?: string;
    message?: string;
    contact?: string;
    services?: string[];
}

export interface IPhishingTemplate {
    name: string;
    company: string;
    id: string;
}

export interface ICustomSubscription {
    user: IUser;
}

export interface IOnBoardingTemplate {
    email: string;
    link: string;
}
