import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, showForm, setShowForm }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset(), setShowForm(false);
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => reset(),
        }
      );
  }
  function onError(errors) {
    // console.log(errors);
  }
  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          {...register("name", {
            required: "This feald is required",
          })}
          type='text'
          id='name'
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label='Maximum capacity'>
        <Input
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This feald is required",
            valueAsNumber: true,
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
          disabled={isWorking}
          type='number'
          id='regularPrice'
          {...register("regularPrice", {
            required: "This feald is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          {...register("discount", {
            required: "This feald is required",
            valueAsNumber: true,
            validate: (value) =>
              value <= Number(getValues("regularPrice")) ||
              "Discount should be less than regular price",
          })}
          type='number'
          id='discount'
          defaultValue={0}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          {...register("description", { required: "This feald is required" })}
          type='number'
          id='description'
          defaultValue=''
        />
      </FormRow>

      {
        <FormRow label={"Cabin photo"} error={errors?.image?.message}>
          <FileInput
            disabled={isWorking}
            id='image'
            type='file'
            accept='image/*'
            {...register("image", {
              required: isEditSession ? false : "This feald is required",
            })}
          />
        </FormRow>
      }

      <FormRow>
        {" "}
        <Button
          disabled={isWorking}
          variation='secondary'
          type='reset'
          onClick={() => {
            setShowForm(!showForm);
          }}>
          Cancel
        </Button>
        <Button disabled={isWorking} disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin "}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
