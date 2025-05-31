const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Buscar usuário pelo e-mail
exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

// Criar novo usuário
exports.createUser = async (name, email, password) => {
  return await prisma.user.create({
    data: { name, email, password }
  });
};

// Atualizar nome e email do perfil
exports.updateProfile = async (id, name, email) => {
  return await prisma.user.update({
    where: { id },
    data: { name, email }
  });
};



exports.deleteUser =  async (id) => {

return await  prisma.user.delete({
    where: { id }
  });

}

exports.findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

exports.findAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
}