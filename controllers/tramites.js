const { response } = require('express')
const Tramite = require('../models/Tramite')
const {ERRORCREATETRAMITE , ERRORUPDATETRAMITE, ERRORNOTTRAMITE, ERRORPRIVILEGES, ERRORDELETETRAMITE} = require('../constants')
const moment = require('moment')

//GET TRAMITE
const getTramites = async(req , res = response) => {
    const {uid} = req
    const tramites = await Tramite.find({user:uid})
                                    //.populate('user', 'name')
    const orderTramites = tramites.sort((a,b) => new moment(b.date).toDate() - new moment(a.date).toDate())
    res.json({
        ok:true,
        tramites: orderTramites
    })
}

//CREATE TRAMITE
const createTramite = async(req, res = response) => {
    const tramite = new Tramite(req.body)
    try {
        tramite.user = req.uid
        const tramiteSaved = await tramite.save()

        res.json({
            ok:true,
            tramite: tramiteSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:ERRORCREATETRAMITE
        })
    }
}

//UPDATE TRAMITE
const updateTramite = async(req , res = response) => {
    const tramiteId = req.params.id
    const uid = req.uid

    try {
        const tramite = await Tramite.findById(tramiteId)

        if(!tramite){
            return res.status(404).json({
                ok:false,
                msg:ERRORNOTTRAMITE
            })
        }

        if(tramite.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:ERRORPRIVILEGES
            })
        }

        const newTramite = {
            ...req.body,
            user:uid
        }

        const tramiteUpdated = await Tramite.findByIdAndUpdate(tramiteId, newTramite, {new:true})

        res.json({
            ok:true,
            tramite: tramiteUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:ERRORUPDATETRAMITE
        })
    }
}

//DELETE TRAMITE 
const deleteTramite = async (req, res = response) => {
    const tramiteId = req.params.id
    const uid = req.uid
    try {
        const tramite = await Tramite.findById(tramiteId)
        if(!tramite){
            return res.status(404).json({
                ok:false,
                msg:ERRORNOTTRAMITE
            })
        }

        if(tramite.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:ERRORPRIVILEGES
            })
        }

        await Tramite.findByIdAndDelete(tramiteId)

        res.json({
            ok:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:ERRORDELETETRAMITE
        })
    }
}


module.exports = {
    getTramites,
    createTramite,
    updateTramite,
    deleteTramite
}