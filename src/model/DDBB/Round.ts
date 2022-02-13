
import { GameStatusEnum } from '../Enum/GameStatusEnum';
import { GenericTraceIdTable } from './GenericTraceIdTable';

export class Round extends GenericTraceIdTable {
    public match_fk: number;
    public roundNumber: number;
    public score_player1: number;
    public score_player2: number;
    public board_json: string;
}