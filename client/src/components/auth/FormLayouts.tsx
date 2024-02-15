import FormInput from "@/components/form/FormInput";
import Link from "next/link";
import Image from 'next/image'
import Logo from "../common/Logo";
import { Button } from "flowbite-react";

interface IFormLayouts {
    children: JSX.Element
    type: 'signin' | 'signup'
}

const FormLayouts = ({children, type}: IFormLayouts) => {
    const isSignIn = type === 'signin'
    const typeLabel = isSignIn ? 'Sign in' : 'Sign up'

    return <div className="gap-8 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <Logo />

    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {typeLabel}
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
                {children}
                
                <Button className="w-full" color="blue">{typeLabel}</Button>

                <div className="flex justify-center items-center gap-2">
                    <hr className="h-0.5 w-full bg-black"/>
                    <span>OR</span>
                    <hr className="h-0.5 w-full bg-black"/>
                </div>

                <button type="submit" className="hover:bg-slate-50 w-full flex justify-center text-blue-600 border-2 border-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center gap-3">
                    <Image 
                        alt="google"
                        src="/google.svg"
                        width={20}
                        height={20}
                    />
                    <span>{typeLabel} with Google</span>
                </button>

                <p className="text-sm font-light text-gray-500">
                    {isSignIn ? "Don't have an account?" : 'Already have account?'} <Link href={!isSignIn ? "signin" : 'signup'} className="font-medium text-blue-600 hover:underline">
                        {!isSignIn ? 'Sign in' : 'Sign up'}
                    </Link>
                </p>
            </form>
        </div>
    </div>
</div>
}

export default FormLayouts