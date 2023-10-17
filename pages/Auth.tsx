import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
 

const Auth = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async() => {

        try{

            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackurl:'/'
            })

            router.push('/')

        }catch(error){
            console.log(error)
        }

    }, [email, password, router])

    const register = useCallback(async()=>{
        try{
            await axios.post('/api/register',{
                email,
                username,
                password
            })

            login()
        }catch(error){
            console.log("reacher here")
            console.log(error)
        }

    }, [email, username, password, login])


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-50 px-16 py-10 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' &&
                            <Input 
                                label="Username"
                                onChange={(e:any)=>{setUsername(e.target.value)}}
                                id="username"
                                value={username}
                            /> 
    }
                            <Input 
                                label="Email"
                                onChange={(e:any)=>{setEmail(e.target.value)}}
                                id="email"
                                type="email"
                                value={email}
                            /> 
                            <Input 
                                label="Password"
                                onChange={(e:any)=>{setPassword(e.target.value)}}
                                id="password"
                                type="password"
                                value={password}
                            /> 
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Signup' }
                        </button>
                        <p className="mt-10 text-neutral-500">
                            {variant === 'login'? 'First time using Netflix?' : 'already have an account'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? "create an account" : "login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


/* 
OVERLAY EFFECT:
Because it has an opacity less than 100%, the background image from the 
outer <div> will be partially visible through it, creating an overlay effect.





*/
export default Auth;