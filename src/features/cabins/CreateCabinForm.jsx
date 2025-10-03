import styled from "styled-components";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Inpout";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCapins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success(`Cabin created successfully!`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }
  async function onError(errors) {
    console.log(errors);
    toast.error("error in the data field");
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isCreating}
          {...register("name", { required: "This feald is required" })}
          type='text'
          id='name'
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label='Maximum capacity'>
        <Input
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This feald is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          type='number'
          id='maxCapacity'
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type='number'
          id='regularPrice'
          {...register("regularPrice", {
            required: "This feald is required",
            min: {
              value: 1,
              message: "price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          {...register("discount", {
            required: "This feald is required",
            validate: (value) =>
              value <= Number(getValues("regularPrice")) ||
              "Discount should be less than regular price",
          })}
          type='number'
          id='discount'
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        disabled={isCreating}
        label={"Description"}
        error={errors?.description?.message}>
        <Textarea
          {...register("description", { required: "This feald is required" })}
          type='number'
          id='description'
          defaultValue=''
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput disabled={isCreating} id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {" "}
        <Button disabled={isCreating} variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating} disabled={isCreating}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
