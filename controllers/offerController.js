// controllers/offerController.js
exports.createOffer = (req, res) => {
  const userId = req.user.id; // vem do JWT
  const { title, description } = req.body;

  // Aqui você faria a lógica de salvar no banco
  res.status(201).json({ message: 'Oferta criada com sucesso!', offer: { userId, title, description } });
};

exports.getAllOffers = (req, res) => {
  // Lógica de buscar ofertas no banco
  res.status(200).json({ message: 'Listando todas as ofertas.' });
};
