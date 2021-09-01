import * as yup from "yup";


export const questionSchema = yup.object().shape({
  title: yup.string().required(),
  explanation: yup.string().required(),
  category: yup.string().required(),
  author: yup.string(),
  source: yup.string(),

  propositions: yup.array().of(yup.object().shape({
     proposition: yup.string().required(), correct: yup.boolean(), 
  
    }),
  ),
});
