import * as Yup from 'yup';

const validateUrl = (url, validLinks, i18n) => {
  Yup.setLocale({
    mixed: {
      notOneOf: i18n('feedback.duplicate'),
      required: i18n('feedback.empty'),
      default: i18n('feedback.invalidUrl'),
    },
    string: {
      url: i18n('feedback.invalidUrl'),
    },
  });
  const schema = Yup.string()
    .trim()
    .required()
    .url(i18n('feedback.invalidUrl'))
    .notOneOf(validLinks, i18n('feedback.duplicate'))
    .validate(url);
  return schema;
};
export default validateUrl;
