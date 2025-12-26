
import * as yup from 'yup'

export const requestPrevCalcSchema = yup.object({
  dataClient: yup.object({
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
      .required('Phone is required'),
    name: yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name too long')
      .required('Name is required'),
    surName: yup.string()
      .optional()
      .max(100, 'Surname too long'),
    description: yup.string()
      .optional()
      .max(500, 'Description too long'),
    INN: yup.string()
      .matches(/^\d{10}$|^\d{12}$/, 'INN must be 10 or 12 digits')
      .required('INN is required'),
    files: yup.mixed().oneOf(['NOT_FOUND', yup.array()])
  }).required(),
  dataSketch: yup.array().of(
    yup.object({
      idSketch: yup.string().required(),
      lines: yup.array().of(
        yup.object({
          idLine: yup.string().required(),
          points: yup.array().of(yup.number()).required(),
          mark: yup.string().required(),
          value: yup.mixed().optional()
        })
      ).optional(),
      params: yup.array().of(
        yup.object({
          idLine: yup.string().required(),
          mark: yup.string().required(),
          value: yup.mixed().required(),
          description: yup.string().required()
        })
      ).optional()
    })
  ).optional(),
  dateRequest: yup.date().optional(),
  verified: yup.boolean().optional(),
  favorites: yup.boolean().optional()
})