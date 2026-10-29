const { response, json } = require("express")
const Event = require('../models/EventModel')


//GET

//getEvents
const getEvent = async(req, res = response) => {

    const event = await Event.find()
                            .populate('user','name')

    
    res.json({
        ok: true,
        msg: 'List of Events',
        event
    })
}

//POST
const createEvent = async(req, res = response) => {
    //verificar que tenga el evento
    //console.log( req.body );
    

    const event = new Event( req.body )

    try {

        event.user = req.uid

        const eventDB = await event.save()

        res.json({
            ok: true,
            event: eventDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please check your information or send a ticket for the admin'
        })  
    }
}

//PUT

const updateEvent = async(req, res = response) => {

    const idEvent = req.params.id
    const uid = req.uid
    //console.log(idEvent);
    
    try {

        const event = await Event.findById( idEvent )

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Please check your information cause the Calendar event does not exist'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized to do that action'
            })
        }

        const newUpdateData = {
            ...req.body,
            user: uid
        } 

        const updatedEvent = await Event.findByIdAndUpdate( idEvent, newUpdateData, {new: true} )
        res.json({
        ok: true,
        msg: 'Data Update',
        event: updatedEvent,
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please check your information or send a ticket for the admin'
        })
    }

}

//DELETE

const deleteEvent = async(req, res = response) => {
    const idEvent = req.params.id
    const uid = req.uid
    //console.log(idEvent);
    
    try {

        const event = await Event.findById( idEvent )

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Please check your information cause the Calendar event does not exist'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized to do that action'
            })
        }

        const deletedData = {
            ...req.body,
            user: uid
        } 

        const deletedEvent = await Event.findByIdAndDelete( idEvent, deletedData)
        res.json({
        ok: true,
        msg: 'The following event has been deleted',
        event: deletedEvent,
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please check your information or send a ticket for the admin'
        })
    }
}

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}
