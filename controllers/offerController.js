

const offerSchema = require('../schemas/offerSchema');

exports.createOffer = async (req, res) => {
  // Validação do corpo da requisição
  const { error } = offerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const userId = req.user.id;
  const { title, description } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO offers (user_id, title, description) VALUES (?, ?, ?)',
      [userId, title, description]
    );
    return res.status(201).json({
      message: 'Oferta criada com sucesso!',
      offerId: result.insertId
    });
  }
   catch (err) {
    console.error('Erro ao criar oferta:', err);
    return res.status(500).json({ message: 'Erro interno ao criar oferta.' });
  }
};

// Listar todas as ofertas
exports.getAllOffers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
         o.id, o.title, o.description, o.created_at, 
         u.id   AS userId, 
         u.name AS userName 
       FROM offers o
       JOIN users u ON u.id = o.user_id
       ORDER BY o.created_at DESC`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao buscar ofertas:', err);
    return res.status(500).json({ message: 'Erro interno ao buscar ofertas.' });
  }
};

