//ERRORES
    //AUTH
const ERROR500 = (etapa) => {
    return `Error en etapa de ${etapa}, por favor comuniquese con el administrador`
}
const ERRORNOTOKEN = 'There is no token in request'
const ERRORNOVALIDTOKEN = 'No valid token in request'
const ERRORUSEREXISTS = 'There is an user existent with this email'
    //TRAMITES
const ERRORCREATETRAMITE = 'There is a problem trying to create Tramite'
const ERRORUPDATETRAMITE = 'There is a problem trying to update Tramite'
const ERRORDELETETRAMITE = 'There is a problem trying to delete Tramite'
const ERRORNOTTRAMITE = 'There is no existent Tramite with this ID'
const ERRORPRIVILEGES = 'There is no privileges to do this operation'



module.exports = {
    ERROR500,
    ERRORNOTOKEN,
    ERRORNOVALIDTOKEN,
    ERRORUSEREXISTS,
    ERRORCREATETRAMITE,
    ERRORUPDATETRAMITE,
    ERRORNOTTRAMITE,
    ERRORPRIVILEGES,
    ERRORDELETETRAMITE
}