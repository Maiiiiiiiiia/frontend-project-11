import * as Yup from 'yup';
import i18nInstance from 'i18next';


const validateUrl = (url, validLinks) => {
    Yup.setLocale({
      mixed: {
        notOneOf: i18nInstance.t('feedback.duplicate'),
        required: i18nInstance.t('feedback.empty'),
        default: i18nInstance.t('feedback.invalidUrl'),
      },
      string: {
        url: i18nInstance.t('feedback.invalidUrl'),
      },
    });
    const schema = Yup.string()
      .trim()
      .required()
      .url(i18nInstance.t('feedback.invalidUrl'))
      .notOneOf(validLinks, i18nInstance.t('feedback.duplicate'))
      .validate(url);
    return schema;
    // console.log(schema);
  };

  export default validateUrl;