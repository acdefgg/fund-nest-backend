import { Request } from 'express';
import { AccountsModel } from '../models/accounts.model';

export interface AccountRequest extends Request {
  account: AccountsModel;
}
