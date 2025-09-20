"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import styles from "./SignInForm.module.scss";
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {isAdminVar} from "@/shared/api/client";
import {useTranslations} from "next-intl";

// Zod схема
const schema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(1, "Введите пароль"),
});
type FormValues = z.infer<typeof schema>;

// захардкоженные данные
const HARDCODED_EMAIL = "admin@gmail.com";
const HARDCODED_PASSWORD = "admin";

export const SignInForm = () => {
    const router = useRouter();
    // const [showPassword, setShowPassword] = useState(false);
const t=useTranslations("authForm")
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid},
        setError,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormValues) => {
        if (
            data.email === HARDCODED_EMAIL &&
            data.password === HARDCODED_PASSWORD
        ) {
            isAdminVar(true);
            router.push("/userList");
        } else {
            setError("password", {
                type: "manual",
                message: "Неверный email или пароль",
            });
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t('text')}</h1>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <label className={styles.label}>
                    <span className={styles.labelText}>{t('email')}</span>
                    <Input
                        type="default"
                        placeholder="email@example.com"
                        {...register("email")}
                        errorMessage={errors.email?.message}
                    />
                </label>

                <label className={styles.label}>
                    <span className={styles.labelText}>{t('password')}</span>
                    <div className={styles.passwordWrapper}>
                        <Input
                            type={"password"}
                            placeholder="Введите пароль"
                            {...register("password")}
                            errorMessage={errors.password?.message}
                        />

                    </div>
                </label>

                <Button type="submit" disabled={isSubmitting || !isValid}>
                    {isSubmitting ? "Входим..." : t('btnText')}
                </Button>
            </form>
        </div>
    );
};
