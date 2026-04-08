
export interface User {
  uuid: string;
  email: string;
  first_name: string;
  last_name: string;
  legacy_office_id: string;
  headquater_abbreviation: string

}

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}
