import FormInput from "@/components/form/FormInput";
import FormLayouts from "@/components/auth/FormLayouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.TITLE} - Sign Up`,    
}

export default function SignUP() {
  return <FormLayouts
      type='signup'
    >
      <>
        <FormInput 
          label="Nickname"
          type="nickname"
          placeholder="example@gmail.com"
          required
        />
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