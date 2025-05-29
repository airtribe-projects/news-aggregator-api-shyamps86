 const generateTokens = async (id,User) => {
  const user = await User.findById(id);

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { refreshToken, accessToken };
};

module.exports=generateTokens;