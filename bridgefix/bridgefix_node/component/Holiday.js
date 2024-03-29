const holiday = require('../models/holidayModel')

module.exports = {
    getHoliday:async(req,res)=>{
        try{
           const holidaylist = await holiday.find().exec()
           res.status(200).json(holidaylist)
        }catch(error){

        }
    }
}