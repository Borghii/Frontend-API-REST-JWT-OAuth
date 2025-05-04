// src/utils/navigateHelper.js
let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const redirectToLogin = () => {
  if (navigator) {
    navigator("/login");
  }
};
