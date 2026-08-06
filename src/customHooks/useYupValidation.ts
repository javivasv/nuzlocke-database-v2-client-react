import * as Yup from 'yup';

const useYupValidation = (schema: Yup.Schema) => {
  const ValidateField = async (field: string, value: unknown) => {
    try {
      await schema.validateAt(field, { [field]: value });
      return '';
    } catch (error) {
      return (error as Yup.ValidationError).message;
    }
  };

  const ValidateForm = async (values: Record<string, unknown>) => {
    const errors: Record<string, string> = {};

    await Promise.all(
      Object.keys(values).map(async field => {
        errors[field] = await ValidateField(field, values[field]);
      })
    );

    return errors;
  };

  return { ValidateField, ValidateForm };
};

export default useYupValidation;
