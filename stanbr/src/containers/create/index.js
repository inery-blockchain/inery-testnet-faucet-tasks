import { createDataEntryAction } from "@/redux/create/createAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormCard from "../../components/common/form";
import TnxOutput from "../../components/common/tnx-output";

const account = process.env.NEXT_PUBLIC_INERY_ACCOUNT;
const actor = process.env.NEXT_PUBLIC_INERY_ACTOR;
const Create = () => {
  const { createLoading, isCreated, createdResponse, id, message } =
    useSelector((state) => state.createDataSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && message)
      setformData((pre) => ({ ...pre, id: id, message: message }));
  }, []);

  const [formData, setformData] = useState({
    id: "",
    message: "",
  });

  const handelIdRandom = () => {
    let idRandom = Math.floor(Math.random() * 10000);
    setformData((prev) => ({ ...prev, id: idRandom }));
  };

  const handleSubmit = () => {
    try {
      if (!formData.id) throw new Error("Please fill id");
      if (!formData.message) throw new Error("Please fill message");

      const paramsData = {
        id: formData.id,
        user: account,
        data: formData.message,
        account: account,
        actor: actor,
      };

      dispatch(createDataEntryAction(paramsData, toast));
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
          ? error?.message
          : error?.toString().slice(7)
      );
    }
  };

  return (
    <>
      <FormCard
        idValue={formData.id}
        messageValue={formData.message}
        messageHandler={(e) =>
          setformData((prev) => ({ ...prev, message: e.target.value }))
        }
        idHandler={(e) =>
          setformData((prev) => ({ ...prev, id: e.target.value }))
        }
        loading={createLoading}
        randomIdHandler={handelIdRandom}
        submitHandler={handleSubmit}
        formHeading="Create Data"
      />
      <TnxOutput data={createdResponse} />
    </>
  );
};

export default Create;
