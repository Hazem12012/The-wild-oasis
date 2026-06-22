import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: translateX(-2px);
`;

function CreateCabinForm({ cabinToEdit = {}, showForm, setShowForm }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState, watch } =
    useForm({
      defaultValues: isEditSession ? editValue : {},
    });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  // handel view attached image
  const isWorking = isCreating || isEditing;
  const imageFile = watch("image");

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            (reset(), setShowForm());
          },
        },
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            setShowForm();
          },
        },
      );
  }
  function onError(errors) {
    console.log(errors);
  }

  const previewImage =
    imageFile?.[0] instanceof File
      ? URL.createObjectURL(imageFile[0])
      : cabinToEdit?.image;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={showForm ? "modal" : "regular"}>
      {/* Cabin Name */}
      <FormRow label={"cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          {...register("name", {
            required: "This feald is required",
          })}
          type="text"
          id="name"
        />
      </FormRow>

      {/* Capacity */}
      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
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
          type="number"
          id="maxCapacity"
        />
      </FormRow>

      {/* Regoler price */}
      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
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

      {/* Discount */}
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
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      {/* Description */}
      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          {...register("description", { required: "This feald is required" })}
          type="number"
          id="description"
          defaultValue=""
        />
      </FormRow>

      {/* atached image */}
      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}>
          <FileInput
            disabled={isWorking}
            id="image"
            type="file"
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "This feald is required",
            })}
          />
          {isEditSession && !previewImage
            ? cabinToEdit?.image && (
                <Img src={cabinToEdit.image} alt={cabinToEdit.name} />
              )
            : previewImage && <Img src={previewImage} alt={cabinToEdit.name} />}
        </div>
      </FormRow>

      {/* buttons */}
      <FormRow>
        {" "}
        <Button
          disabled={isWorking}
          variation="secondary"
          type="reset"
          onClick={() => {
            setShowForm();
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
