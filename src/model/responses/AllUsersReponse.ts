import GenericReponse from "./GenericResponse";
export class AllUsersReponse extends GenericReponse {
    users: {
        id: number;
        email: string;
        name: string;
        surname: string;
        rol: number;
    }[];
}