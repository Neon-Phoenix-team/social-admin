"use client";

import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useTranslations} from "next-intl";
import {useMutation} from "@apollo/client/react";
import {LOGIN_ADMIN} from "@/shared/api/queries/queries";
import {
    LoginAdminMutation,
    LoginAdminMutationVariables,
} from "@/shared/api/queries/queries.generated";

import styles from "./SignInForm.module.scss";
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {isAdminVar} from "@/shared/api/client";
import {LinearProgress} from "@/shared/ui/LinearProgress/LinearProgress";
import {useState} from "react";

const schema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(1, "Введите пароль"),
});
type FormValues = z.infer<typeof schema>;

export const SignInForm = () => {
    const router = useRouter();
    const t = useTranslations("authForm");
    const [loginAdmin] = useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LOGIN_ADMIN);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        try {
            const {data: response} = await loginAdmin({variables: data});

            if (response?.loginAdmin?.logged) {
                isAdminVar(true);
                setIsLoggedIn(true); // скрываем форму моментально
                router.push("/userList");
            } else {
                throw new Error("Неверный email или пароль");
            }
        } catch (err: any) {
            setError("password", {
                type: "manual",
                message: err.message || "Ошибка входа",
            });
        }
    };



    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("text")}</h1>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <label className={styles.label}>
                    <span className={styles.labelText}>{t("email")}</span>
                    <Input
                        type="default"
                        placeholder="email@example.com"
                        {...register("email")}
                        errorMessage={errors.email?.message}
                    />
                </label>

                <label className={styles.label}>
                    <span className={styles.labelText}>{t("password")}</span>
                    <div className={styles.passwordWrapper}>
                        <Input
                            type="password"
                            placeholder={t("placeholder")}
                            {...register("password")}
                            errorMessage={errors.password?.message}
                        />
                    </div>
                </label>

                <Button type="submit" disabled={isSubmitting || !isValid}>
                    {isSubmitting ? "Входим..." : t("btnText")}
                </Button>
            </form>
        </div>
    );
};
