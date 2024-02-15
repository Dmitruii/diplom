import FormInput from "@/components/form/FormInput";
import FormLayouts from "@/components/auth/FormLayouts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `${process.env.TITLE} - Sign In`,    
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
  