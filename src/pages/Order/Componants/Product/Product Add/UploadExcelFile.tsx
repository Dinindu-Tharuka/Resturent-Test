import { Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import axiosInstance from "../../../../../services/api-client";
import { useState } from "react";

interface Props{
    category_id:number;
}

const UploadExcelFile = ({ category_id }:Props) => {
  const [uploadError, setUploadError] = useState("");
  const [success, setSuccess] = useState("")
  // for upload excel
  const { register, handleSubmit } = useForm();

  const onSubmitExcel = async (data: FieldValues) => {
    setUploadError('')
    setSuccess('')
    const selectedFile = data.file[0];

    const fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!fileTypes.includes(selectedFile.type)) {
      setUploadError("Given File type is not valid");
    }
    const newFile = {
      file: selectedFile,
      category_id:category_id
    };

    await axiosInstance
      .post("/store/make-multi-products/", newFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => setSuccess('Created successfully products. refresh the page to update the products.'))
      .catch(() => setUploadError('Bad fromat or Network error.'));
  };
  return (
    <>
      {uploadError && <Text color='red'>{uploadError}</Text>}
      {success && <Text color='green'>{success}</Text>}
      <form onSubmit={handleSubmit(onSubmitExcel)} >
        <FormLabel marginTop={5}>Upload Excel</FormLabel>
        <Input type="file" {...register("file")} marginBottom={5}/>

        <Button type="submit" marginBottom={5}>Upload</Button>
      </form>
    </>
  );
};

export default UploadExcelFile;
