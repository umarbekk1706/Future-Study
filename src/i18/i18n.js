import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: "Home",
      courses: "Courses",
      tests: "Tests",
      blog: "Blog",
      about: "About Us",
      login: "Login",
      logout: "Logout",
      register: "Register"
    }
  },
  uz: {
    translation: {
      home: "Bosh Sahifa",
      courses: "Kurslar",
      tests: "Testlar",
      blog: "Blog",
      about: "Biz haqimizda",
      login: "Kirish",
      logout: "Chiqish",
      register: "Ro'yxatdan o'tish"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
