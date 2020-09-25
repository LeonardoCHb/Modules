import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';


import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointment = await appointmentsRepository.find()
    return response.json(appointment);
})
appointmentsRouter.post('/', async (request, response) => {


    const { provider_id, date } = request.body
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate
    });

    return response.json(appointment);


})

export default appointmentsRouter;
