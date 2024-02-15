import FormInput from "@/components/form/FormInput";
import FormLayouts from "@/components/auth/FormLayouts";
import { Metadata } from "next";
import { defaultTitle } from "@/app/layout";

export const metadata: Metadata = {
    title: `${defaultTitle} - Sign In`,    
}

export default function SignIn() {
    return <FormLayouts
        type='signin'
    >
        <>
            <FormInput 
                label="Your email"
                type="email"
                placeholder="example@gmail.com"
                required
            />
            <FormInput 
                label="Password"
                type="password"
                placeholder="••••••••"
                required
            />
        </>
    </FormLayouts>
  }
  