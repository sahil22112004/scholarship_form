
export interface ScholarshipFormType {
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
  loading: boolean;
  error: string | null;
}
