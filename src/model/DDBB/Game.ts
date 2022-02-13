
import { GameStatusEnum } from '../Enum/GameStatusEnum';
import { GenericTraceIdTable } from './GenericTraceIdTable';

export class Game extends GenericTraceIdTable {
    public player1_fk: number;
    public player2_fk: number;
    public round: number;
    public status: GameStatusEnum;
}