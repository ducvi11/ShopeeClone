import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { toast } from 'react-toastify'
type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const value = watch()

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-right',
          autoClose: 2000
        })
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                type='email'
                name='email'
                register={register}
                className='relative mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                type='password'
                name='password'
                register={register}
                className='relative mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link to='/register' className='ml-2 text-red-400'>
                  Đăng kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
