import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as z from "zod";

const schema = z
  .object({
    name: z.string().min(1, "Имя обязательно"),
    email: z
      .string()
      .min(1, "email обязательно")
      .email("Введите корректный email"),
    password: z
      .string()
      .min(6, "Пароль обязателен минимум 6 символов")
      .regex(
        /^(?=.*[A-Z]).*$/,
        "Пароль должен содержать хотя бы одну заглавную букву латинского алфавита"
      ),
    confirmPassword: z.string().min(6, "Подтверждение пароля обязательно"),
    birthday: z.date({
      required_error: "Дата рождения обязательна",
      invalid_type_error: "Введите корректную дату"
    }),
    gender: z.string().min(1, "Укажите свой пол"),
    phone: z
      .string()
      .min(1, "Телефон обязателен")
      .regex(/^\+(?:[0-9]●?){6,14}[0-9]$/, "Введите корректный номер")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
  });

const FormRegistry = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const formRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: undefined,
      gender: "",
      phone: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
    showModal();
  };

  return (
    <>
      <Form ref={formRef} onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item
          label="Имя"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите ваше имя"
                autoComplete="name"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email.message : null}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="example@mail.com"
                autoComplete="email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password ? errors.password.message : null}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Не менее 6 символов"
                autoComplete="new-password"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Подтверждение пароля"
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword ? errors.confirmPassword.message : null}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Повторите пароль"
                autoComplete="new-password"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Дата рождения"
          validateStatus={errors.birthday ? "error" : ""}
          help={errors.birthday ? errors.birthday.message : null}
        >
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => field.onChange(date?.toDate())}
                value={field.value ? dayjs(field.value) : null}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Пол"
          validateStatus={errors.gender ? "error" : ""}
          help={errors.gender?.message}
        >
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="male"> Мужской </Radio>
                <Radio value="female"> Женский </Radio>
              </Radio.Group>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Телефон"
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="BY"
                onChange={field.onChange}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Успешно зарегистрировано"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </Modal>
    </>
  );
};

export default FormRegistry;
