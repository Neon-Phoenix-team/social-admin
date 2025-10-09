'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './SignInForm.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { basicAuthVar, isAdminVar } from '@/shared/api/client'
import { useMutation } from '@apollo/client/react'
import { LOGIN_ADMIN } from '@/shared/api/queries/queries'
import {
  LoginAdminMutation,
  LoginAdminMutationVariables,
} from '@/shared/api/queries/queries.generated'
import { useTranslations } from 'next-intl'
import { FormValues, getSchema } from '@/features/Auth/lib/schemas'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'


export const SignInForm = () => {
  const router = useRouter()
  const [loginAdmin, { loading }] = useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LOGIN_ADMIN)
  const t = useTranslations('authForm')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(getSchema(t)),
    mode: 'onChange',
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const { data: response } = await loginAdmin({ variables: data })
      if (response?.loginAdmin?.logged) {
        isAdminVar(true)
        const credentials = btoa(`${data.email}:${data.password}`)
        basicAuthVar(credentials)
        router.push('/userList')
      } else {
        throw new Error(t("error"));
      }
    } catch (err: any) {
      setError('password', {
        type: 'manual',
        message: err.message || t("error"),
      })
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('text')}</h1>
      {loading && <LinearProgress />}
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
            {...register('email')}
            errorMessage={errors.email?.message}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>{t('password')}</span>
          <div className={styles.passwordWrapper}>
            <Input
              type="password"
              placeholder={t('placeholder')}
              {...register('password')}
              errorMessage={errors.password?.message}
            />
          </div>
        </label>
        <Button type="submit" disabled={isSubmitting || !isValid}>
          {t(`${isSubmitting ? 'loading' : "btnText"}`)}
        </Button>
      </form>
    </div>
  )
}
