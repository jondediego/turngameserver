
import { GenericIdTable } from './GenericIdTable';

export class TokenTemporal extends GenericIdTable {
    public token: string;
    public firstRequest: Date;
    public lastRequest: Date;
    public user_fk: number;
}