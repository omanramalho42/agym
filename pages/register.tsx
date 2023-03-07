import React, { useEffect } from 'react'

import { signIn, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'

import { getError } from '../utils/error'

import Link from 'next/link'

import axios from 'axios'

const register = () => {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect }:any = router.query;

  useEffect(() => {
    if(session?.user) {
      router.push(redirect || '/')
    }
  },[router,session,redirect]);
  
  const submitHandler = async ({ 
    name, 
    email, 
    password,
    age,
    pain,
    live,
    bed,
    independent,
    activity,
    support,
    regularly 
  }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        age,
        pain,
        live,
        bed,
        independent,
        activity,
        support,
        regularly
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if(result.error) {
        toast.error(result.error);
      } else {
        toast.success("sucesso ao criar usuário");
      }

    } catch (error: any) {
      toast.error(getError(error))
    }
  }

  return (
    <section className="bg-gray-50 h-full w-full dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
        Flowbite    
      </a> */}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create and account
          </h1> */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitHandler)}>
            {/* NAME */}
            <div>
              <label 
                htmlFor="name" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john doe" 
                required
                autoFocus
                {...register('name', {
                  required: 'Please enter your name',
                })}
              />
              {errors.name && (
                //@ts-ignore
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>
            {/* EMAIL */}
            <div>
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" 
                required
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
              />
              {errors.email && (
                //@ts-ignore
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            {/* PASSWORD */}
            <div>
              <label 
                htmlFor="password" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="••••••••" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required
                {...register('password', {
                  required: 'Please enter password',
                  minLength: { value: 6, message: 'password is more than 5 chars' },
                })}
              />
              {errors.password && (
                //@ts-ignore
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            {/* CONFIRM PASSWORD */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input 
                type="password" 
                name="confirmPassword" 
                id="confirmPassword" 
                placeholder="••••••••" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required
                {...register('confirmPassword', {
                  required: 'Please enter confirm password',
                  validate: (value) => value === getValues('password'),
                  minLength: {
                    value: 6,
                    message: 'Confirm password is more than 5 chars'
                  },
                })}
              />
              {errors.confirmPassword && (
                <div className="text-red-500 ">
                  {/* @ts-ignore */}
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <div className="text-red-500 ">
                    Password do not match
                  </div>
                )
              }
            </div>
            
            {/* AGE */}
            <div className=''>
              <label 
                htmlFor="age" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Age
              </label>
              <input 
                type="text" 
                name="age" 
                id="age" 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="21" 
                required
                {...register('age', {
                  required: 'Please enter your age',
                  valueAsNumber: true
                })}
              />
              {errors.age && (
                //@ts-ignore
                <div className="text-red-500">{errors.age.message}</div>
              )}
            </div>
            
            <div className='w-full flex'>
              {/* PAIN */}
              <div className='flex-1 flex row items-center justify-between'>
                <label 
                  htmlFor="pain" 
                  className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sente dores crônicas?
                </label>
                <input 
                  type="checkbox" 
                  name="pain" 
                  id="pain" 
                  className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('pain')}
                />
                {errors.age && (
                  //@ts-ignore
                  <div className="text-red-500">{errors.pain.message}</div>
                )}
              </div>

              {/* LIVE ALONE */}
              <div className='flex-1 flex row items-center justify-between'>
                <label 
                  htmlFor="live" 
                  className="flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mora sozinho?
                </label>
                <input 
                  type="checkbox" 
                  name="live" 
                  id="live" 
                  className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  {...register('live')}
                />
                {errors.live && (
                  //@ts-ignore
                  <div className="text-red-500">{errors.live.message}</div>
                )}
              </div>
            </div>

            <div className="w-full flex">
              {/* BED */}
              <div className='flex-1 flex row items-center justify-between'>
                <label 
                  htmlFor="bed" 
                  className="flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  É acamado?
                </label>
                <input 
                  type="checkbox" 
                  name="bed" 
                  id="bed" 
                  className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  {...register('bed')}
                />
                {errors.bed && (
                  //@ts-ignore
                  <div className="text-red-500">{errors.bed.message}</div>
                )}
              </div>

              {/* Activity */}
              <div className='flex-1 flex row items-center justify-between'>
                <label 
                  htmlFor="activity" 
                  className="flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prática atividade fisíca regulargmente?
                </label>
                <input 
                  type="checkbox" 
                  name="activity" 
                  id="activity" 
                  className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  {...register('activity')}
                />
                {errors.activity && (
                  //@ts-ignore
                  <div className="text-red-500">{errors.activity.message}</div>
                )}
              </div>
            </div>

            <div className='w-full flex'>
              {/* Medical Support */}
              <div className='flex-1 flex row items-center justify-between'>
                <label 
                  htmlFor="support" 
                  className="flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Precisa de acompanhamento médico?
                </label>
                <input 
                  type="checkbox" 
                  name="support" 
                  id="support" 
                  className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('support')}
                />
                {errors.support && (
                  //@ts-ignore
                  <div className="text-red-500">{errors.support.message}</div>
                )}
              </div>

              {/* INDEPENDENT */}
              <div className='flex-1 flex row items-center justify-between'>
                <label 
                  htmlFor="independet" 
                  className="flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  É independente?
                </label>
                <input 
                  type="checkbox" 
                  name="independent" 
                  id="independent" 
                  className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('independent')}
                />
                {errors.independent && (
                  //@ts-ignore
                  <div className="text-red-500">{errors.independent.message}</div>
                )}
              </div>
            </div>

            {/* QUANTAS VEZES NA SEMANA */}
            <div className='flex row items-center justify-between'>
              <label 
                htmlFor="regularly" 
                className="flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantas vezes na semana?
              </label>
              <select  
                name="regularly" 
                id="regularly" 
                className="bg-gray-50 border relative bottom-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('regularly')}
              >
                <option value="1">
                  1 vez na semana
                </option>
                <option value="2-3">
                  2 a 3 vezez na semana
                </option>
                <option value="3-4">
                  3 a 4 vezez na semana
                </option>
                <option value="5">
                  5 vezes na semana
                </option>
              </select>
              {errors.regularly && (
                //@ts-ignore
                <div className="text-red-500">{errors.regularly.message}</div>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="terms" 
                  aria-describedby="terms" 
                  type="checkbox" 
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label 
                  htmlFor="terms" 
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the 
                  <a 
                    className="font-medium text-primary-600 ml-1 hover:underline dark:text-primary-500" 
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full text-black bg-gray-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <div className='flex row items-center'>
              <p 
                className="text-sm font-light text-gray-500 dark:text-gray-400"
              >
                Already have an account?   
              </p>
              <Link 
                className="font-medium text-primary-600 hover:underline dark:text-black-500"
                href={`/login?redirect=${redirect || '/'}`}
              >
                <p className='ml-1 text-white'>
                  Login here
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default register;