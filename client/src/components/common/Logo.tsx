import Image from 'next/image'
const Logo = () => {
    return <a href="/" className="flex items-center text-2xl font-semibold text-gray-900">
        <Image className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" width={0} height={0} /> 
        E-Sportech    
    </a>
}

export default Logo