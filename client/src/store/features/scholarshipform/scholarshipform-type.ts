

export interface PersonalDetailType {
  documentType: 'National identity card' | 'Passport' | 'RUC' | 'Other' | "Foreigner's identity card";
  documentNumber: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated';
  profession: string;
  dob: string;
  nationality: string;
  country: string;
  state: string;
  city: string;
  income: string;
  expense: string;
  dependent: 'yes' | 'no';
  hasChildren: 'yes' | 'no';
  children0to4: string;
  children5to12: string;
  children13to18: string;
  children18plus: string;
}


export interface ScholarshipFormType {
  id: number;
  uuid: string;
  token: string;
  applicant_uuid: string;
  information_request_uuid: string;
  program_uuid: string;
  advisor_uuid: string;
  notification_language: string;
  status: string;
  reminder_sent: boolean;
  send_date: string;
  finished_at: string;
  disabled_at: string;
  has_academic_degree: boolean;
  archived_at: string;
  summary_sent_to_advisor: boolean

}

export interface Scholarship {
  ScholarshipForm: ScholarshipFormType | null;
  PersonalDetail: PersonalDetailType | null;
  loading: boolean;
  error: string | null;
}
