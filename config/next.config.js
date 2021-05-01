const config={
    BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL +":"+ process.env.NEXT_PUBLIC_BASE_PORT}`,
    TOKEN_MAP : process.env.TOKEN_MAP
}

export default config;