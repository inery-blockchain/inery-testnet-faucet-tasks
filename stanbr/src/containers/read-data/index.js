"use client";
import { createDataEntryAction } from "@/redux/create/createAction";
import { readDataEntryAction } from "@/redux/read-data/readDataAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormCard from "../../components/common/form";
const account = process.env.NEXT_PUBLIC_INERY_ACCOUNT;
const actor = process.env.NEXT_PUBLIC_INERY_ACTOR;
import TnxOutput from "../../components/common/tnx-output";
const ReadDataContainer = () => {
  const { createLoading, isCreated, createdResponse, id, message } =
    useSelector((state) => state.createDataSlice);
  const { readLoading, isReaded, readedResponse } = useSelector(
    (state) => state.readDataSlice
  );
  const dispatch = useDispatch();

  const [formData, setformData] = useState({
    id: "",
    message: "",
  });

  useEffect(() => {
    if (id && message) setformData((pre) => ({ ...pre, id: id }));
  }, []);

  const handelIdRandom = () => {
    let idRandom = Math.floor(Math.random() * 10000);
    setformData((prev) => ({ ...prev, id: idRandom }));
  };

  const handleSubmit = () => {
    try {
      if (!formData.id) throw new Error("Please fill id");

      const paramsData = {
        id: formData.id,
        user: account,
        account: account,
        actor: actor,
      };

      dispatch(readDataEntryAction(paramsData, toast));
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
        messageHandler={false}
        idHandler={(e) =>
          setformData((prev) => ({ ...prev, id: e.target.value }))
        }
        loading={readLoading}
        randomIdHandler={false}
        submitHandler={handleSubmit}
        formHeading="Read Data"
      />
      <TnxOutput data={readedResponse} />
    </>
  );
};

export default ReadDataContainer;
