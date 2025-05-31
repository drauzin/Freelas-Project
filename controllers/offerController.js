const offerModel = require('../models/offerModel');
const offerSchema = require('../schemas/offerSchema');
exports.createOffer = async (req, res) => {
  const { title, description } = req.body;
  const { error } = offerSchema.validate({ title, description });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const userId = req.user.id;


  try {
    const offer = await offerModel.createOffer(title, description, userId);

    return res.status(201).json({
      message: 'Oferta criada com sucesso!',
      offer: {
        id: offer.id,
        title: offer.title,
        description: offer.description,
        created_at: offer.createdAt,
        userId: offer.userId
      }
    });
  } catch (error) {
  console.error('Erro ao criar oferta:', error);
  return res.status(500).json({ message: error.message }); 
  }
};



