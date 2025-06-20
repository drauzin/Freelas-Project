// Controller bookingController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
  const { serviceId, date, clientName, clientWhatsApp } = req.body;
  const userId = req.user.id; // Pegue o userId do middleware JWT que você deve implementar

  try {
    const booking = await prisma.booking.create({
  data: {
    serviceId: Number(serviceId),
    date: new Date(date),
    clientName,
    clientWhatsApp,
    userId
  }
});

    return res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar agendamento.' });
  }
};

exports.listBookings = async (req, res) => {
  try {
    // Se quiser, pode proteger para que só admin veja:
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    const bookings = await prisma.booking.findMany({
      include: {
         // inclui dados do serviço
      },
      orderBy: {
        date: 'desc',
      }
    });

    return res.json(bookings);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    return res.status(500).json({ message: 'Erro ao listar agendamentos.' });
  }
};