import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Inpout";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

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
    mutate({ ...data, image: data.image[0] });
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
        <FileInput
          disabled={isCreating}
          id='image'
          type='file'
          accept='image/*'
          {...register("image", {
            required: "This feald is required",
          })}
        />
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
