// HELPER FUNCTION TO FIND USER BY EMAIL
export async function findUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}
