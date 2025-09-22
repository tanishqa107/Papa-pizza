import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import Icon from './Icon';
import axios from "axios";

const PapaLogo = () => (
    <div className="w-24 h-24 rounded-full border-4 border-orange-200 bg-orange-100 flex items-center justify-center overflow-hidden mx-auto">
        <svg viewBox="0 0 200 200" className="w-32 h-32" style={{ transform: 'translateY(-0.4rem)' }}>
            <path d="M140,65 C155,40 130,25 100,25 C70,25 45,40 60,65 Z" fill="white" stroke="#4A2C2A" strokeWidth="4"/>
            <rect x="55" y="60" width="90" height="15" rx="5" fill="white" stroke="#4A2C2A" strokeWidth="4"/>
            <circle cx="100" cy="110" r="45" fill="#FDDAC5"/>
            <path d="M80 100 C 85 105, 90 105, 95 100" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M105 100 C 110 105, 115 105, 120 100" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M70,120 C40,135 70,145 100,130 C130,145 160,135 130,120 C115,125 85,125 70,120 Z" fill="#593c3c"/>
            <g transform="rotate(20, 130, 140) translate(5, 5)">
                <path d="M130,125 L165,160 L145,170 Z" fill="#FFC107" stroke="#E65100" strokeWidth="3" strokeLinejoin="round"/>
                <circle cx="145" cy="145" r="5" fill="#D84315"/>
                <circle cx="152" cy="155" r="4" fill="#D84315"/>
            </g>
        </svg>
    </div>
);

const GoogleIcon = () => (
    <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.22,0-9.641-3.238-11.383-7.739l-6.57,4.82C9.656,39.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);


const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const[name, setName] = useState("");
    const[number, setNumber] = useState("");

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);

        localStorage.setItem("number",number)
        localStorage.setItem("name",name)

        console.log(name)
        console.log(number)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col justify-center items-center p-4" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}>
            <main className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl text-center">
                <PapaLogo />
                <h1 className="text-3xl font-bold text-stone-900 mt-4">Welcome to Papa Pizza</h1>
                <p className="text-gray-600 mt-2 mb-8">Sign in to enter Papa's Kitchen!</p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className='flex flex-col gap-4 mb-3'>

                    <div className='flex flex-col items-start'>

                    <label htmlFor="name" className='font-medium'>Name</label>
                <input type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className='border border-black rounded-md w-full p-3' 
                placeholder='Enter name' />

                    </div>

                   <div className='flex flex-col items-start'>

                <label htmlFor="">Phone Number</label>

                <input type="text" 
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                className='border border-black rounded-md w-full p-3' 
                placeholder='Enter phone number' />

                </div>

                </div>
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-70"
                >
                    {loading ? (
                        <>
                           <Icon size={6} className="animate-spin mr-3"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.994 0h-4.992"/></Icon>
                           <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                            <GoogleIcon />
                            Sign in with Google
                        </>
                    )}
                </button>
                 <p className="text-xs text-gray-400 mt-6">
                    By signing in, you agree to Papa's terms of service and our privacy policy.
                </p>
            </main>
        </div>
    );
};

export default Login;
