import { question } from './question';

export interface quiz {
  name: string;
  description: string;
  category: string;
  questions: question[];
  craetedBy: string;
  id: string;
}
