export interface ProfileUserProps {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
export interface ProfileProps {
  user:ProfileUserProps
}