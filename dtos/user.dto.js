// dtos/user.dto.js

export const signinResponseDTO = (userData, userPreferData) => {
    return {
      email: userData.email,
      name: userData.name,
      preferCategory: userPreferData.map(item => item.preferCategory)
    };
  };
  