
import { GameStatusEnum } from '../Enum/GameStatusEnum';
import { GenericTraceIdTable } from './GenericTraceIdTable';

export class UserStatistics extends GenericTraceIdTable {
    public user_fk: number;
    matches_won: number;
    matches_lost: number;
}