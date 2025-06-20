const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createOffer = async (title, description, userId) => {
  try {
    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        userId,
      }
    });
    return offer;
  } catch (error) {
    console.error('Erro ao criar oferta:', error);
    throw new Error('Erro interno ao criar oferta.');
  }
};
