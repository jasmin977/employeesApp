import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  //  convert files to base64 :use of the JavaScript FileReader which has a readAsDataURL method that reads the binary data and encodes it as a base64 data URL
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return [
    values,
    async (e) =>
      e.target.name === "profile_IMG"
        ? setValues({
            ...values,
            [e.target.name]: await convertToBase64(e.target.files[0]),
          })
        : setValues({
            ...values,
            [e.target.name]: e.target.value,
          }),
  ];
};
