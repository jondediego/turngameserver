import GenericResponse from "../../model/responses/GenericResponse";
import ErrorResponse from "../../model/responses/ErrorResponse";


class CommonController {

    public async createResponse(callbackFunc: Function) {
        let response: GenericResponse | ErrorResponse;
        try {
            await callbackFunc();
            response = {
                ok: true
            }
        } catch (err) {
           console.error("Error al generar respuesta: "+ err.stack+ " message: "+err.message);
            if (err.type){
                //ErrorResponse
                response = {
                    ok: false,
                    errorMessage: err.message
                }
            }else{
                //GenericScheduleErrorReponse
                response = {
                    ok: false,
                    errorMessage: err.message
                }
            }
        } finally {
            return response;
        }
    }
}

export default CommonController;