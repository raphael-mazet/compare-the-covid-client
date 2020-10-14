interface User {
  id: number | null;
  username: string;
  email: string;
  password: string;
}

interface QueryData {
  getUserbyId: User;
}

export type { User, QueryData };
