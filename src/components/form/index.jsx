import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
const { Option } = Select;
const FormRegistry = () => {
  const [visible, setVisible] = useState(false);
  const [regData, setRegData] = useState({});

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setRegData(data);
    showModal();
  };

  const password = watch("password");

  return (
    <>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Имя"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : null}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Введите Имя" }}
            render={({ field }) => <Input {...field} autoComplete="name" />}
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
            rules={{
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/,
                message: "Введите корректный email"
              }
            }}
            render={({ field }) => <Input {...field} autoComplete="email" />}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password ? errors.password.message : null}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 6,
                message: "Пароль должен содержать не менее 6 символов"
              },
              pattern: {
                value: /^(?=.*[A-Z]).*$/,
                message:
                  "Пароль должен содержать хотя бы одну заглавную букву латинского алфавита"
              }
            }}
            render={({ field }) => (
              <Input.Password {...field} autoComplete="new-password" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Подтверждение пароля"
          validateStatus={errors.confirm ? "error" : ""}
          help={errors.confirm ? errors.confirm.message : null}
        >
          <Controller
            name="confirm"
            control={control}
            rules={{
              required: "Пожалуйста, подтвердите ваш пароль!",
              validate: (value) => value === password || "Пароли не совпадают"
            }}
            render={({ field }) => (
              <Input.Password {...field} autoComplete="new-password" />
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
            rules={{
              required: "Пожалуйста, выберите дату рождения!"
            }}
            render={({ field }) => <DatePicker {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Пол"
          validateStatus={errors.gender ? "error" : ""}
          help={errors.gender ? errors.gender.message : null}
        >
          <Controller
            name="gender"
            control={control}
            rules={{
              required: "Пожалуйста, укажите свой пол!"
            }}
            render={({ field }) => (
              <Select placeholder="select your gender" {...field}>
                <Option value="male">Мужской</Option>
                <Option value="female">Женский</Option>
              </Select>
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
            defaultValue=""
            rules={{
              required: "Пожалуйста, укажите свой телефон!",
              validate: (value) => {
                if (value.includes("_")) {
                  return "Введите полный номер телефона";
                }
                if (!/^\+\d{12}$/.test(value)) {
                  return "Введите номер в формате +XXXXXXXXXXXX";
                }
                return true;
              }
            }}
            render={({ field }) => (
              <InputMask
                mask="+999999999999"
                maskChar={null}
                alwaysShowMask={false}
                {...field}
                autoComplete="phone"
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    style={{ width: "100%" }}
                    placeholder="+__________"
                  />
                )}
              </InputMask>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={showModal}>
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
        <pre>{JSON.stringify(regData, null, 2)}</pre>
      </Modal>
    </>
  );
};

export default FormRegistry;
