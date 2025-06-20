// controllers/serviceController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
};
